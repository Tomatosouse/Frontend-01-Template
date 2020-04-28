// 写一个正则表达式 匹配所有 Number 直接量
'((0|[1-9]([0-9]|[1-9][0-9]*)?.([0-9]|[1-9][0-9]*)?([eE](([0-9]|[1-9][0-9]*)|+([0-9]|[1-9][0-9]*)|-([0-9]|[1-9][0-9]*)))?)|.([0-9]|[1-9][0-9]*)([eE](([0-9]|[1-9][0-9]*)|+([0-9]|[1-9][0-9]*)|-([0-9]|[1-9][0-9]*)))?|(0|[1-9]([0-9]|[1-9][0-9]*)?)([eE](([0-9]|[1-9][0-9]*)|+([0-9]|[1-9][0-9]*)|-([0-9]|[1-9][0-9]*)))?)|(((0b)|(0B))[0-1]*)|(((0o)|(0O))[0-7]*)|(((0x)|(0X))[0-9a-fA-F]*)'

// 写一个 UTF-8 Encoding 的函数
function UTF8_Encoding(string){
    // 严   U+e425
    //     0100    111000    100101
    //1110 xxxx 10 xxxxxx 10 xxxxxx
    //1110 0100 10 111000 10 100101          
    
    //分类 1~4个字节 表示一个UTF8
    // 0           ~   00007F
    // 000080      ~   0007FF
    // 000800      ~   00FFFF
    // 010000      ~   10FFFF
    let len = string.length;
    let arr = new Array();
    for(let i = 0; i < len; i++){
        let c = string.codePointAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF) {
            arr.push(((c >> 18) & 0x07) | 0xF0);
            arr.push(((c >> 12) & 0x3F) | 0x80);
            arr.push(((c >> 6) & 0x3F) | 0x80);
            arr.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000800 && c <= 0x00FFFF) {
            arr.push(((c >> 12) & 0x0F) | 0xE0);
            arr.push(((c >> 6) & 0x3F) | 0x80);
            arr.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000080 && c <= 0x0007FF) {
            arr.push(((c >> 6) & 0x1F) | 0xC0);
            arr.push((c & 0x3F) | 0x80);
        } else {
            arr.push(c & 0xFF);
        }
    }
    return arr;
}


// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

//把老师课上展示的抄了一遍 实在是不知道咋下手 囧~

'(?:[^n\\r\u2028\u2029]\(?:"\bfnrtv\n\r\u2028\u20291]|\r\n)|\x[0-9a-fA-F]{2}|\u[0-9a-fA-F]{4}]\[^0-9ux"\bfnrt\n\\r\u2028\u2029])*'
    
