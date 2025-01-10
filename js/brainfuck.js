BF = {
    interpreter: function(bf_src) {
        var that = {},
            result = "",
            pointer = 0,
            memory_size = 300,
            memory = [],
            src_pointer = 0,
            src = bf_src.replace(/\n/g, ""),
            src_length = src.length,
            braces = [],
            ascii_chars = [
                '<NUL>','<SOH>','<STX>','<ETX>','<EOT>','<ENQ>','<ACK>','<BEL>',
                '<BS>' ,'<HT>' ,'<LF>' ,'<VT>' ,'<NP>' ,'<CR>' ,'<SO>' ,'<SI>' ,
                '<DLE>','<DC1>','<DC2>','<DC3>','<DC4>','<NAK>','<SYN>','<ETB>',
                '<CAN>','<EM>' ,'<SUB>','<ESC>','<FS>' ,'<GS>' ,'<RS>' ,'<US>' ,
                ' ', '!', '"', '#', '$', '%', '&', '\'',
                '(', ')', '*', '+', ',', '-', '.', '/',
                '0', '1', '2', '3', '4', '5', '6', '7',
                '8', '9', ':', ';', '<', '=', '>', '?',
                '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
                'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
                'X', 'Y', 'Z', '[', '\\' ,']', '^', '_',
                '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
                'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
                'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
                'x', 'y', 'z', '{', '|', '}', '~', 'DEL'
            ],
            commands = {
                ">": function() { pointer += 1; },
                "<": function() { pointer -= 1; },
                "+": function() { memory[pointer] += 1; },
                "-": function() { memory[pointer] -= 1; },
                ".": function() { result += ascii_chars[memory[pointer]]; },
                ",": function() {
                    var char_code = window.prompt("").charCodeAt(0);
                    if (char_code > 128) { throw "'" + chr + "' is non ascii character."; };
                    memory[pointer] = char_code;
                },
                "[": function() {
                    if( memory[pointer] == 0 ){
                        while( src[src_pointer] != "]" && src_pointer <= src.length){
                            src_pointer += 1;
                        }
                    } else {
                        braces.push(src_pointer);
                    }
                },
                "]": function() {
                    if (braces.length > 0){
                        src_pointer = braces.pop();
                        src_pointer -= 1;
                    } else {
                        src_pointer += 1;
                    }
                }
            };
        
        while(memory.length < memory_size){ memory.push(0); }
        
        var evaluate = function(){
            try {
                if (memory_size < src_length) { throw "out of memory"; };
                for (src_pointer; src_pointer < src_length; src_pointer += 1 ) {
                    if (commands[src[src_pointer]] == undefined) { throw src[src_pointer] + " is invalid command"; }
                    commands[src[src_pointer]]();
                }
            } catch(e) {
                result += "\n" + e;
            }
            return result;
        };
        
        that.evaluate = evaluate;
        return that;
    },
    run: function(e) {
        var src = document.getElementById("input").value,
            output = document.getElementById("output");

        output.value = BF.interpreter(src).evaluate();
        e.preventDefault();
    }
};

document.getElementById('run').onclick = BF.run;
