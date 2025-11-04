import {
    BOOLEAN, NUMBER, ARRAY, OBJECT, STRING, STRINGEMAIL, STRINGHEX, STRINGHEX32, STRINGHEX64, STRINGHEX128, STRINGHEX256, STRINGHEX512, STRINGCLEAN, NONEMPTYSTRING, NONEMPTYSTRINGHEX, NONEMPTYSTRINGCLEAN, NONEMPTYARRAY, OBJECTCLEAN, NONNULLOBJECT, NONNULLOBJECTCLEAN, STRINGORNOTHING, STRINGEMAILORNOTHING, STRINGHEXORNOTHING, STRINGHEX32ORNOTHING, STRINGHEX64ORNOTHING, STRINGHEX128ORNOTHING, STRINGHEX256ORNOTHING, STRINGHEX512ORNOTHING, STRINGCLEANORNOTHING, NUMBERORNOTHING, BOOLEANORNOTHING, ARRAYORNOTHING, OBJECTORNOTHING, OBJECTCLEANORNOTHING, STRINGORNULL, STRINGEMAILORNULL, STRINGHEXORNULL, STRINGHEX32ORNULL, STRINGHEX64ORNULL, STRINGHEX128ORNULL, STRINGHEX256ORNULL, STRINGHEX512ORNULL, STRINGCLEANORNULL,  NUMBERORNULL, BOOLEANORNULL, ARRAYORNULL
} from "../output/index.js"

export const testsForType = []

testsForType[BOOLEAN] = [
    [{}, false],
    [[], false],
    [true, true],
    [false, true],
    ["true", false],
    ["false", false],
    [1, false],
    [0, false],
    ["yes", false],
    ["no", false],
    [null, false],
    [undefined, false]
]
testsForType[NUMBER] = [
    [undefined, false],
    [false, false],
    ["1", false],
    [0, true],
    [1, true],
    [-1, true],
    [1.23, true],
    [-1.23, true],
    [1e10, true],
    [-1e10, true],
    ["123", false],
    [NaN, false],
    [Infinity, false],
    [-Infinity, false],
    [null, false],
    ["", false],
    [" ", false],
    [[], false],
    [{}, false],
    ["0x11", false]
]
testsForType[ARRAY] = [
    [null, false],
    [undefined, false],
    [0, false],
    [false, false],
    ["", false],
    ["[]", false],
    [{}, false],
    [[], true],
    [[1], true],
    [[1, 2, 3], true],
    [["a", null, undefined], true],
    [[[]], true],
    [[true, false], true],
    [new Array(0), true],
    [new Array(100).fill("a"), true]
]
testsForType[OBJECT] = [
    [null, true],
    [undefined, false],
    [[], true],
    [0, false],
    [false, false],
    [{}, true],
    [{"a": 1}, true],
    [{"nested": {"x": 2}}, true],
    [{"array": [1, 2, 3]}, true],
    [Object.create(null), true],
    [{"": "emptyKey"}, true],
    [{"a": undefined}, true],
    [{"a": null}, true],
    [{"a": NaN}, true],
    [{["__proto__"]: {"polluted": true}}, true],
    [{"nested": {"x": {"constructor": {"prototype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constrctor": {"prototype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructor": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {["__proto__"]: {"polluted": true}}}}}, true]
]
testsForType[STRING] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["", true],
    [" ", true],
    ["a", true],
    ["hello world", true],
    ["こんにちは", true],
    ["🙂", true],
    ["abc\u200bdef", true],
    ["abc\u200ddef", true],
    ["abc\uFEFFdef", true],
    ["\u00A0", true],
    ["\t", true],
    ["\n", true],
    ["💩", true],
    ["abc\x00def", true],
    ["abc\r\n", true],
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", true],
    ["a".repeat(1024), true]
]
testsForType[STRINGEMAIL] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["test@example.com", true],
    ["user+filter@domain.co.uk", true],
    ["üñîçøðé@example.com", false],
    ["user@[192.168.0.1]", false],
    ["invalid@", false],
    ["@no-local-part.com", false],
    ["space in@domain.com", false],
    ["trailingdot.@example.com", false],
    ["user@-domain.com", false],
    ["user@domain..com", false],
    ["user@domain.com ", false],
    [" user@domain.com", false],
    ["user@domain.com\n", false]
] 
testsForType[STRINGHEX] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", true],
    ["0xabc", false],
    ["ABCDEF", true],
    ["1234567890abcdef", true],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", true],
    ["deadbeef", true],
    ["a".repeat(257), true],
    ["00ff", true],
    [" 00ff", false],
    ["00ff ", false]
]
testsForType[STRINGHEX32] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(32), true],
    ["A".repeat(32), true],
    ["0".repeat(31), false],
    ["f".repeat(33), false],
    ["abc123", false],
    ["xyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxy", false]
]
testsForType[STRINGHEX64] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(64), true],
    ["A".repeat(64), true],
    ["f".repeat(63), false],
    ["f".repeat(65), false],
    ["0x" + "f".repeat(62), false]
]
testsForType[STRINGHEX128] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(128), true],
    ["A".repeat(128), true],
    ["f".repeat(127), false],
    ["f".repeat(129), false]
]
testsForType[STRINGHEX256] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(256), true],
    ["f".repeat(255), false],
    ["f".repeat(257), false]
]
testsForType[STRINGHEX512] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(512), true],
    ["f".repeat(511), false],
    ["f".repeat(513), false]
]
testsForType[STRINGCLEAN] = [
    [null, false], // 0
    [undefined, false], // 1
    [{}, false], // 2
    [[], false], // 3
    [0, false], // 4
    [false, false], // 5
    ["Hello", true], // 6
    ["こんにちは", false], // 7
    ["abc\x00def", false], // 8
    ["line\nbreak", true], // 9
    ["tab\tchar", true], // 10
    ["💩", false], // 11
    ["visible space ", true], // 12
    ["abc\u200bdef", false], // 13
    ["abc\uFEFFdef", false], // 14
    ["abc\u202Edef", false], // 15
    ["", true], // 16
    [" ", true], // 17
    ["a", true], // 18
    ["hello world", true], // 19
    ["🙂", false], // 20
    ["\u00A0", true], // 21
    ["\t", true], // 22
    ["\n", true], // 23
    ["abc\r\n", false], // 24
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", false], // 25
    ["a".repeat(1024), true] // 26
]
testsForType[NONEMPTYSTRING] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["a", true],
    [" ", true],
    ["", false],
    ["💩", true],
    [" ", true],
    ["a", true],
    ["hello world", true],
    ["こんにちは", true],
    ["🙂", true],
    ["abc\u200bdef", true],
    ["abc\u200ddef", true],
    ["abc\uFEFFdef", true],
    ["\u00A0", true],
    ["\t", true],
    ["\n", true],
    ["💩", true],
    ["abc\x00def", true],
    ["abc\r\n", true],
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", true],
    ["a".repeat(1024), true]
]
testsForType[NONEMPTYSTRINGHEX] = [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", true],
    ["0xabc", false],
    ["ABCDEF", true],
    ["1234567890abcdef", true],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", true],
    ["a".repeat(257), true],
    ["00ff", true],
    [" 00ff", false],
    ["00ff ", false]
]
testsForType[NONEMPTYSTRINGCLEAN] = [
    [null, false], // 0
    [undefined, false], // 1
    [{}, false], // 2
    [[], false], // 3
    [0, false], // 4
    [false, false], // 5
    ["Hello", true], // 6
    ["こんにちは", false], // 7
    ["abc\x00def", false], // 8
    ["line\nbreak", true], // 9
    ["tab\tchar", true], // 10
    ["💩", false], // 11
    ["visible space ", true], // 12
    ["abc\u200bdef", false], // 13
    ["abc\uFEFFdef", false], // 14
    ["abc\u202Edef", false], // 15
    ["", false], // 16
    [" ", true], // 17
    ["a", true], // 18
    ["hello world", true], // 19
    ["🙂", false], // 20
    ["\u00A0", true], // 21
    ["\t", true], // 22
    ["\n", true], // 23
    ["abc\r\n", false], // 24
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", false], // 25
    ["a".repeat(1024), true] // 26
]
testsForType[NONEMPTYARRAY] = [
    [null, false],
    [undefined, false],
    [0, false],
    [false, false],
    [[], false],
    ["", false],
    ["[12, 12]", false],
    [{}, false],
    [[1], true],
    [[1, 2, 3], true],
    [["a", null, undefined], true],
    [[[]], true],
    [[true, false], true],
    [new Array(0), false],
    [new Array(100).fill("a"), true]
]
testsForType[OBJECTCLEAN] = [
    ["", false],
    [null, true],
    [undefined, false],
    [[], true],
    [0, false],
    [false, false],
    [{}, true],
    [{"a": 1}, true],
    [{"nested": {"x": 2}}, true],
    [{"array": [1, 2, 3]}, true],
    [Object.create(null), true],
    [{"": "emptyKey"}, true],
    [{"a": undefined}, true],
    [{"a": null}, true],
    [{"a": NaN}, true],
    [{["__proto__"]: {"polluted": true}}, false],
    [{"nested": {"x": {"constructor": {"prototype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constrctor": {"prototype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constructor": {"prottype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constructr": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {["__proto__"]: {"polluted": true}}}}}, false]
]
testsForType[NONNULLOBJECT] = [
    [undefined, false],
    [[], true],
    [0, false],
    [false, false],
    [null, false],
    [{}, true],
    [{"a": 1}, true],
    [{"nested": {"x": 2}}, true],
    [{"array": [1, 2, 3]}, true],
    [Object.create(null), true],
    [{"": "emptyKey"}, true],
    [{"a": undefined}, true],
    [{"a": null}, true],
    [{"a": NaN}, true],
    [{["__proto__"]: {"polluted": true}}, true],
    [{"nested": {"x": {"constructor": {"prototype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constrctor": {"prototype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructor": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {["__proto__"]: {"polluted": true}}}}}, true]
]
testsForType[NONNULLOBJECTCLEAN] = [
    ["", false],
    ["asd", false],
    [undefined, false],
    [[], true],
    [0, false],
    [false, false],
    [null, false],
    [{}, true],
    [{"a": 1}, true],
    [{"nested": {"x": 2}}, true],
    [{"array": [1, 2, 3]}, true],
    [Object.create(null), true],
    [{"": "emptyKey"}, true],
    [{"a": undefined}, true],
    [{"a": null}, true],
    [{"a": NaN}, true],
    [{["__proto__"]: {"polluted": true}}, false],
    [{"nested": {"x": {"constructor": {"prototype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constrctor": {"prototype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constructor": {"prottype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constructr": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {["__proto__"]: {"polluted": true}}}}}, false]
]
testsForType[STRINGORNOTHING] = [
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [undefined, true],
    ["", true],
    ["abc", true],
    ["💀", true],
    [null, false],
    ["", true],
    [" ", true],
    ["a", true],
    ["hello world", true],
    ["こんにちは", true],
    ["🙂", true],
    ["abc\u200bdef", true],
    ["abc\u200ddef", true],
    ["abc\uFEFFdef", true],
    ["\u00A0", true],
    ["\t", true],
    ["\n", true],
    ["💩", true],
    ["abc\x00def", true],
    ["abc\r\n", true],
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", true],
    ["a".repeat(1024), true]
]
testsForType[STRINGEMAILORNOTHING] = [
    [null, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [undefined, true],
    ["test@example.com", true],
    ["invalid@", false],
    ["", false],
    ["test@example.com", true],
    ["user+filter@domain.co.uk", true],
    ["üñîçøðé@example.com", false],
    ["user@[192.168.0.1]", false],
    ["invalid@", false],
    ["@no-local-part.com", false],
    ["space in@domain.com", false],
    ["trailingdot.@example.com", false],
    ["user@-domain.com", false],
    ["user@domain..com", false],
    ["user@domain.com ", false],
    [" user@domain.com", false],
    ["user@domain.com\n", false]
]
testsForType[STRINGHEXORNOTHING] = [
    [null, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [undefined, true],
    ["abc", true],
    ["123xyz", false],
    ["abc", true],
    ["0xabc", false],
    ["ABCDEF", true],
    ["1234567890abcdef", true],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", true],
    ["deadbeef", true],
    ["a".repeat(257), true],
    ["00ff", true],
    [" 00ff", false],
    ["00ff ", false]
]
testsForType[STRINGHEX32ORNOTHING] = [
    [null, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [undefined, true],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF",false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(32), true],
    ["A".repeat(32), true],
    ["s".repeat(32), false],
    ["x".repeat(32), false],
    ["0".repeat(31), false],
    ["f".repeat(33), false],
    ["abc123", false],
    ["xyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxyzxy", false]
]
testsForType[STRINGHEX64ORNOTHING] = [
    [null, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [undefined, true],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(64), true],
    ["A".repeat(64), true],
    ["x".repeat(64), false],
    ["f".repeat(63), false],
    ["f".repeat(65), false],
    ["0x" + "f".repeat(62), false]
]
testsForType[STRINGHEX128ORNOTHING] = [
    [null, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(128), true],
    ["A".repeat(128), true],
    ["s".repeat(128), false],
    ["x".repeat(128), false],
    ["f".repeat(127), false],
    ["f".repeat(129), false],
    [undefined, true],
    ["a".repeat(128), true]
]
testsForType[STRINGHEX256ORNOTHING] = [
    [null, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(256), true],
    ["x".repeat(256), false],
    ["f".repeat(255), false],
    ["f".repeat(257), false],
    [undefined, true],
    ["a".repeat(256), true]
]
testsForType[STRINGHEX512ORNOTHING] = [
    [null, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(512), true],
    ["x".repeat(512), false],
    ["f".repeat(511), false],
    ["f".repeat(513), false],
    [undefined, true],
    ["a".repeat(512), true]
]
testsForType[STRINGCLEANORNOTHING] = [
    [null, false], // 0
    [undefined, true], // 1
    [{}, false], // 2
    [[], false], // 3
    [0, false], // 4
    [false, false], // 5
    ["Hello", true], // 6
    ["こんにちは", false], // 7
    ["abc\x00def", false], // 8
    ["line\nbreak", true], // 9
    ["tab\tchar", true], // 10
    ["💩", false], // 11
    ["visible space ", true], // 12
    ["abc\u200bdef", false], // 13
    ["abc\uFEFFdef", false], // 14
    ["abc\u202Edef", false], // 15
    ["", true], // 16
    [" ", true], // 17
    ["a", true], // 18
    ["hello world", true], // 19
    ["🙂", false], // 20
    ["\u00A0", true], // 21
    ["\t", true], // 22
    ["\n", true], // 23
    ["abc\r\n", false], // 24
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", false], // 25
    ["a".repeat(1024), true] // 26
]
testsForType[NUMBERORNOTHING] = [
    [null, false],
    [{}, false],
    [[], false],
    [false, false],
    [undefined, true],
    [123, true],
    ["123", false],
    [NaN, false],
    [undefined, true],
    [0, true],
    [1, true],
    [-1, true],
    [1.23, true],
    [-1.23, true],
    [1e10, true],
    [-1e10, true],
    [Infinity, false],
    [-Infinity, false],
    ["", false],
    [" ", false],
    ["0x11", false]
]
testsForType[BOOLEANORNOTHING] = [
    ["", false],
    [{}, false],
    [[], false],
    [0, false],
    [undefined, true],
    [true, true],
    [false, true],
    ["true", false],
    ["false", false],
    [1, false],
    [0, false],
    ["yes", false],
    ["no", false],
    [null, false]
]
testsForType[ARRAYORNOTHING] = [
    [null, false],
    [0, false],
    [false, false],
    [undefined, true],
    ["", false],
    ["[]", false],
    [{}, false],
    [[], true],
    [[1], true],
    [[1, 2, 3], true],
    [["a", null, undefined], true],
    [[[]], true],
    [[true, false], true],
    [new Array(0), true],
    [new Array(100).fill("a"), true]
]
testsForType[OBJECTORNOTHING] = [
    ["", false],
    ["asd", false],
    [null, true],
    [{}, true],
    [[], true],
    [0, false],
    [false, false],
    [undefined, true],
    [{}, true],
    [{"a": 1}, true],
    [{"nested": {"x": 2}}, true],
    [{"array": [1, 2, 3]}, true],
    [Object.create(null), true],
    [{"": "emptyKey"}, true],
    [{"a": undefined}, true],
    [{"a": null}, true],
    [{"a": NaN}, true],
    [{["__proto__"]: {"polluted": true}}, true],
    [{"nested": {"x": {"constructor": {"prototype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constrctor": {"prototype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructor": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {["__proto__"]: {"polluted": true}}}}}, true]
]
testsForType[OBJECTCLEANORNOTHING] = [
    [[], true],
    [0, false],
    [false, false],
    [undefined, true],
    [null, true],
    [{}, true],
    [{"a": 1}, true],
    [{"nested": {"x": 2}}, true],
    [{"array": [1, 2, 3]}, true],
    [Object.create(null), true],
    [{"": "emptyKey"}, true],
    [{"a": undefined}, true],
    [{"a": null}, true],
    [{"a": NaN}, true],
    [{["__proto__"]: {"polluted": true}}, false],
    [{"nested": {"x": {"constructor": {"prototype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constrctor": {"prototype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constructor": {"prottype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constructr": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {["__proto__"]: {"polluted": true}}}}}, false]
]
testsForType[STRINGORNULL] = [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [null, true],
    ["", true],
    ["abc", true],
    ["💀", true],
    ["", true],
    [" ", true],
    ["a", true],
    ["hello world", true],
    ["こんにちは", true],
    ["🙂", true],
    ["abc\u200bdef", true],
    ["abc\u200ddef", true],
    ["abc\uFEFFdef", true],
    ["\u00A0", true],
    ["\t", true],
    ["\n", true],
    ["💩", true],
    ["abc\x00def", true],
    ["abc\r\n", true],
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", true],
    ["a".repeat(1024), true]
]
testsForType[STRINGEMAILORNULL] = [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [null, true],
    ["test@example.com", true],
    ["invalid@", false],
    ["test@example.com", true],
    ["user+filter@domain.co.uk", true],
    ["üñîçøðé@example.com", false],
    ["user@[192.168.0.1]", false],
    ["invalid@", false],
    ["@no-local-part.com", false],
    ["space in@domain.com", false],
    ["trailingdot.@example.com", false],
    ["user@-domain.com", false],
    ["user@domain..com", false],
    ["user@domain.com ", false],
    [" user@domain.com", false],
    ["user@domain.com\n", false]
]
testsForType[STRINGHEXORNULL] = [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [null, true],
    ["abc", true],
    ["0xabc", false],
    ["ABCDEF", true],
    ["1234567890abcdef", true],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", true],
    ["deadbeef", true],
    ["a".repeat(257), true],
    ["00ff", true],
    [" 00ff", false],
    ["00ff ", false]
]
testsForType[STRINGHEX32ORNULL] = [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [null, true],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(32), true],
    ["A".repeat(32), true],
    ["s".repeat(32), false],
    ["a".repeat(33), false],
    ["a".repeat(31), false]
]
testsForType[STRINGHEX64ORNULL] = [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [null, true],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(64), true],
    ["b".repeat(64), true],
    ["A".repeat(64), true],
    ["s".repeat(64), false],
    ["X".repeat(64), false],
    ["a".repeat(63), false],
    ["a".repeat(65), false]
]
testsForType[STRINGHEX128ORNULL] = [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(128), true],
    ["A".repeat(128), true],
    ["f".repeat(128), true],
    ["x".repeat(128), false],
    [".".repeat(128), false],
    ["\n".repeat(128), false],
    ["\0".repeat(128), false],
    ["f".repeat(127), false],
    ["f".repeat(129), false],
    [null, true]
]
testsForType[STRINGHEX256ORNULL] = [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(256), true],
    ["f".repeat(256), true],
    ["x".repeat(256), false],
    [".".repeat(256), false],
    ["\n".repeat(256), false],
    ["\0".repeat(256), false],
    ["f".repeat(255), false],
    ["f".repeat(257), false],
    [null, true]
]
testsForType[STRINGHEX512ORNULL] = [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["abc", false],
    ["0xabc", false],
    ["ABCDEF", false],
    ["1234567890abcdef", false],
    ["GHIJKL", false],
    ["abc123!", false],
    ["", false],
    ["deadbeef", false],
    ["a".repeat(257), false],
    ["00ff", false],
    [" 00ff", false],
    ["00ff ", false],
    ["a".repeat(512), true],
    ["f".repeat(512), true],
    ["x".repeat(512), false],
    [".".repeat(512), false],
    ["\n".repeat(512), false],
    ["\0".repeat(512), false],
    ["f".repeat(511), false],
    ["f".repeat(513), false],
    [null, true]
]
testsForType[STRINGCLEANORNULL] = [
    [null, true], // 0
    [undefined, false], // 1
    [{}, false], // 2
    [[], false], // 3
    [0, false], // 4
    [false, false], // 5
    ["Hello", true], // 6
    ["こんにちは", false], // 7
    ["abc\x00def", false], // 8
    ["line\nbreak", true], // 9
    ["tab\tchar", true], // 10
    ["💩", false], // 11
    ["visible space ", true], // 12
    ["abc\u200bdef", false], // 13
    ["abc\uFEFFdef", false], // 14
    ["abc\u202Edef", false], // 15
    ["", true], // 16
    [" ", true], // 17
    ["a", true], // 18
    ["hello world", true], // 19
    ["🙂", false], // 20
    ["\u00A0", true], // 21
    ["\t", true], // 22
    ["\n", true], // 23
    ["abc\r\n", false], // 24
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", false], // 25
    ["a".repeat(1024), true] // 26
] 
testsForType[NUMBERORNULL] = [
    [undefined, false],
    [false, false],
    [null, true],
    [123, true],
    [NaN, false],
    [0, true],
    [1, true],
    [-1, true],
    [1.23, true],
    [-1.23, true],
    [1e10, true],
    [-1e10, true],
    ["123", false],
    [Infinity, false],
    [-Infinity, false],
    ["", false],
    [" ", false],
    [[], false],
    [{}, false],
    ["0x11", false]
]
testsForType[BOOLEANORNULL] = [
    ["", false],
    ["abs", false],
    [{}, false],
    [[], false],
    [0, false],
    [null, true],
    [true, true],
    [false, true],
    ["true", false],
    ["false", false],
    [1, false],
    [0, false],
    ["yes", false],
    ["no", false],
    [undefined, false]
]
testsForType[ARRAYORNULL] = [
    ["asd", false],
    [undefined, false],
    [0, false],
    [false, false],
    [null, true],
    ["", false],
    ["[]", false],
    [{}, false],
    [[], true],
    [[1], true],
    [[1, 2, 3], true],
    [["a", null, undefined], true],
    [[[]], true],
    [[true, false], true],
    [new Array(0), true],
    [new Array(100).fill("a"), true]
]
