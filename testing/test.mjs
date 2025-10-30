import * as tested from "../output/index.js"

async function run() {

    //run test.
}

run()


############################################################
#region testing
export initialize = ->
    log "initialize"
    
    for s,i in testSchemas
        try validate = createValidationFunction(s, true)
        catch err then log "@#{i} createValidationFunction failed!\n#{err.message}"
        try stringify = createStringifyFunction(s)
        catch err then log "@#{i} createStringifyFunction failed!\n#{err.message}"
        try
            o = testObjects[i]
            err = validate(o)
            if err then log "@#{i}: validation failed!"
            else log "@#{i}: validation succeeded!"
            jsonString = JSON.stringify(o)
            ownString = null
            ownString = stringify(o)
            log "jsonString: #{jsonString}"
            log "ownString: #{ownString}"
        catch err then log "@#{i}Testing failed!\n#{err.message}"
        if!ownString? then log stringify.toString()

    #region Plain Type  = OK
    # sampleSchema = NONNULLOBJECT
    # validObj = {}
    # invalidObj = null
    #endregion

    #region Object Level 1 = OK
    # sampleSchema = {
    #     email: STRINGEMAIL,
    #     passwordH: STRINGHEX64,
    #     timestamp: NUMBER
    # }
    # validObj = {
    #     email: "jhonny@jason.jo"
    #     passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    #     timestamp: 1
    # }
    # invalidObj = {
    #     email: "wrong@really.11"
    #     passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #     timestamp: 3
    # }
    # sampleSchema = {
    #     email: "myEmail@me.me",
    #     passwordH: STRINGHEX64,
    #     timestamp: NUMBER
    # }
    # validObj = {
    #     email: "myEmail@me.me"
    #     passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    #     timestamp: 1
    # }
    # invalidObj = {
    #     email: "wrong@really.11"
    #     passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #     timestamp: 3
    # }

    #endregion
    
    #region Array Level 1 = OK
    # sampleSchema = [ NUMBER, NUMBER, NUMBER, NUMBER, NUMBERORNOTHING ]

    # validObj = [ 10, 0.1, 51, NaN, Infinity ]
    # validObj = [ 10, 0.1, 51, NaN ]
    
    # invalidObj = [ 10, 0.1, 51, NaN, 31, 33, 25 ]

    #endregion

    #region Object Level 2
    # sampleSchema = {
    #     email: STRINGEMAIL,
    #     auth: {
    #         signature: STRINGHEX64
    #         passwordH: STRINGHEX64
    #         timestamp: NUMBER
    #         none: NUMBERORNOTHING
    #     }
    # }
    # validObj = {
    #     email: "myEmail@me.me"
    #     auth: {
    #         signature: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         timestamp: 1
    #     }
    # }
    # validObj = {
    #     email: "myEmail@me.me"
    #     auth: {
    #         signature: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         timestamp: 0
    #         none: 12
    #     }
    # }

    # invalidObj = {
    #     email: "myEmail@me.me"
    #     auth: {
    #         signature: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         timestamp: 0
    #         none: ""
    #     }
    # }
    # invalidObj = {
    #     email: "myEmail@me.me"
    #     auth: {
    #         signature: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         none: 12
    #     }
    # }
    # invalidObj = {
    #     email: "myEmail@me.me"
    #     auth: {
    #         signature: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         timestamp: 4
    #         none: 12
    #     }
    # }
    # invalidObj = {
    #     email: "myEmail@me.me"
    #     auth: {
    #         signature: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         passwordH: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    #         timestamp: 0
    #         none: 12
    #         corrupt: true
    #     }
    # }


    #endregion

    #region Array Level 2 = OK
    # sampleSchema = {
    #     last5or4: [
    #         NUMBER,
    #         NUMBER,
    #         NUMBER,
    #         NUMBER,
    #         NUMBERORNOTHING
    #     ]
    # }
    # validObj = {
    #     last5or4: [
    #         10,
    #         0.1,
    #         51,
    #         NaN,
    #         Infinity
    #     ]
    # }
    # validObj = {
    #     last5or4: [
    #         10,
    #         0.1,
    #         51,
    #         NaN
    #     ]
    # }
    # invalidObj = { # too few entries
    #     last5or4: [
    #         10,
    #         0.1,
    #         51
    #     ]
    # }
    # invalidObj = { # too many entries
    #     last5or4: [
    #         10,
    #         0.1,
    #         51,
    #         NaN,
    #         Infinity,
    #         NaN
    #     ]
    # }

    # sampleSchema = [
    #     [ NUMBER, NUMBER, NUMBER, NUMBER ]
    # ]
    # validObj = [
    #     [ 10, 0.1, 51, NaN ]
    # ]
    # invalidObj = [
    #     [ 10, 0.1, 51, "" ]
    # ]
    
    #endregion

    #region Object Level 3
    #endregion

    #region Array Level 3
    #endregion

    # try val = createValidationFunction(sampleSchema)
    # catch err
    #     log err # probably it was a constant String in the Schema
    #     val = createValidationFunction(sampleSchema, true)

    # log val.toString() 
    # er = val(validObj)
    # log "validObj returned #{er}"
    # er = val(invalidObj)
    # log "invalidObj returned #{er}:#{ErrorToMessage[er]}"

    # return
    # console.log(val.toString())

    # er = val(validObj)
    # log "valid returned #{er}"
    # er = val(invalidObj)
    # log "invalid returned #{er}:#{ErrorToMessage[er]}"

    # check("STRING") # 100% success
    # check("STRINGEMAIL") # 100% success
    # check("STRINGHEX") # 100% success
    # check("STRINGHEX32") # 100% success
    # check("STRINGHEX64") # 100% success
    # check("STRINGHEX128") # 100% success
    # check("STRINGHEX256") # 100% success
    # check("STRINGHEX512") # 100% success
    # check("NUMBER") # 100% succcess
    # check("BOOLEAN") # 100% success
    # check("ARRAY") # 100% success
    # check("OBJECT") # 100% success
    # check("STRINGORNOTHING") # 100% success
    # check("STRINGEMAILORNOTHING") # 100% success
    # check("STRINGHEXORNOTHING") # 100% success
    # check("STRINGHEX32ORNOTHING") # 100% success
    # check("STRINGHEX64ORNOTHING") # 100% success
    # check("STRINGHEX128ORNOTHING") # 100% success
    # check("STRINGHEX256ORNOTHING") # 100% success
    # check("STRINGHEX512ORNOTHING") # 100% success
    # check("NUMBERORNOTHING") # 100% success
    # check("BOOLEANORNOTHING") # 100% success
    # check("ARRAYORNOTHING") # 100% success
    # check("OBJECTORNOTHING") # 100% success
    # check("STRINGORNULL") # 100% success
    # check("STRINGEMAILORNULL") # 100% success
    # check("STRINGHEXORNULL") # 100% success
    # check("STRINGHEX32ORNULL") # 100% success
    # check("STRINGHEX64ORNULL") # 100% success
    # check("STRINGHEX128ORNULL") # 100% success
    # check("STRINGHEX256ORNULL") # 100% success
    # check("STRINGHEX512ORNULL") # 100% success
    # check("NUMBERORNULL") # 100% success
    # check("BOOLEANORNULL") # 100% success
    # check("ARRAYORNULL") # 100% success
    # check("NONNULLOBJECT") # 100% success
    # check("NONEMPTYSTRING") # 100% success
    # check("NONEMPTYARRAY") # 100% success
    # check("NONEMPTYSTRINGHEX") # 100% success
    # check("NONEMPTYSTRINGCLEAN") # 100% success
    # check("STRINGCLEAN") # 100% success 
    # check("STRINGCLEANORNULL") # 100% success
    # check("STRINGCLEANORNOTHING") # 100% success
    # check("OBJECTCLEAN") # 100% success
    # check("NONNULLOBJECTCLEAN") # 100% success
    # check("OBJECTCLEANORNOTHING") # 100% success
    return

############################################################
check = (key) ->
    success = 0
    failedCases = []
    for test,i in tO[key]
        arg = test[0]
        er = typeValidationFunctions[tMap[key]](arg)
        if er and !test[1] then success++
        if !er and !test[1] then failedCases.push(i)
        if er and test[1] then failedCases.push(i)
        if !er and test[1] then success++

    log "Checked #{key}:"
    log "    #{success} successes"
    log "    #{failedCases.length} fails"
    log failedCases
    log " "

############################################################
#region typeMap
tMap = Object.create(null)
tMap["STRING"] = STRING
tMap["STRINGEMAIL"] = STRINGEMAIL
tMap["STRINGHEX"] = STRINGHEX 
tMap["STRINGHEX32"] = STRINGHEX32 
tMap["STRINGHEX64"] = STRINGHEX64 
tMap["STRINGHEX128"] = STRINGHEX128 
tMap["STRINGHEX256"] = STRINGHEX256 
tMap["STRINGHEX512"] = STRINGHEX512 
tMap["NUMBER"] = NUMBER
tMap["BOOLEAN"] = BOOLEAN
tMap["ARRAY"] = ARRAY
tMap["OBJECT"] = OBJECT
tMap["STRINGORNOTHING"] = STRINGORNOTHING
tMap["STRINGEMAILORNOTHING"] = STRINGEMAILORNOTHING
tMap["STRINGHEXORNOTHING"] = STRINGHEXORNOTHING
tMap["STRINGHEX32ORNOTHING"] = STRINGHEX32ORNOTHING
tMap["STRINGHEX64ORNOTHING"] = STRINGHEX64ORNOTHING
tMap["STRINGHEX128ORNOTHING"] = STRINGHEX128ORNOTHING
tMap["STRINGHEX256ORNOTHING"] = STRINGHEX256ORNOTHING
tMap["STRINGHEX512ORNOTHING"] = STRINGHEX512ORNOTHING
tMap["NUMBERORNOTHING"] = NUMBERORNOTHING
tMap["BOOLEANORNOTHING"] = BOOLEANORNOTHING
tMap["ARRAYORNOTHING"] = ARRAYORNOTHING
tMap["OBJECTORNOTHING"] = OBJECTORNOTHING
tMap["STRINGORNULL"] = STRINGORNULL
tMap["STRINGEMAILORNULL"] = STRINGEMAILORNULL
tMap["STRINGHEXORNULL"] = STRINGHEXORNULL
tMap["STRINGHEX32ORNULL"] = STRINGHEX32ORNULL
tMap["STRINGHEX64ORNULL"] = STRINGHEX64ORNULL
tMap["STRINGHEX128ORNULL"] = STRINGHEX128ORNULL
tMap["STRINGHEX256ORNULL"] = STRINGHEX256ORNULL
tMap["STRINGHEX512ORNULL"] = STRINGHEX512ORNULL
tMap["NUMBERORNULL"] = NUMBERORNULL
tMap["BOOLEANORNULL"] = BOOLEANORNULL
tMap["ARRAYORNULL"] = ARRAYORNULL
tMap["NONNULLOBJECT"] = NONNULLOBJECT
tMap["NONEMPTYSTRING"] = NONEMPTYSTRING
tMap["NONEMPTYARRAY"] = NONEMPTYARRAY
tMap["NONEMPTYSTRINGHEX"] = NONEMPTYSTRINGHEX
tMap["NONEMPTYSTRINGCLEAN"] = NONEMPTYSTRINGCLEAN
tMap["STRINGCLEAN"] = STRINGCLEAN
tMap["STRINGCLEANORNULL"] = STRINGCLEANORNULL 
tMap["STRINGCLEANORNOTHING"] = STRINGCLEANORNOTHING
tMap["OBJECTCLEAN"] = OBJECTCLEAN
tMap["NONNULLOBJECTCLEAN"] = NONNULLOBJECTCLEAN
tMap["OBJECTCLEANORNOTHING"] = OBJECTCLEANORNOTHING

#endregion


############################################################
#region Schema Tests
testSchemas = []
testObjects = []

############################################################
## @0
testSchemas.push(OBJECT)
testObjects.push({})

############################################################
## @1
testSchemas.push([NUMBERORNOTHING])
testObjects.push([])

############################################################
## @2
testSchemas.push({ email: STRINGEMAILORNOTHING })
testObjects.push({})

############################################################
## @3
testSchemas.push([ NUMBER, NUMBER, NUMBER,STRINGEMAILORNOTHING ])
testObjects.push([1,1,1, "email@alli.li"])

############################################################
## @4
testSchemas.push({
    email: STRINGEMAIL,
    name: STRING,
    sub: {
        okay: BOOLEAN
    }
})
testObjects.push({
    email: "alfred@moser.de",
    name: "alfi",
    sub: {
        okay: true
    }
})

############################################################
## @5
testSchemas.push({
    email: STRINGEMAIL,
    name: STRING,
    sub: [
        NUMBERORNOTHING,
        NUMBERORNOTHING,
        NUMBERORNOTHING,
        NUMBERORNOTHING
    ]
})
testObjects.push({
    email: "alfred@moser.de",
    name: "alfi",
    sub: [ 2, 3 ]
})

#endregion

############################################################
tO = {
  "STRING": [
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
  ],
  "STRINGEMAIL": [
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
  ],
  "STRINGHEX": [
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
  ],
  "STRINGHEX32": [
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
  ],
  "STRINGHEX64": [
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
  ],
  "STRINGHEX128": [
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
  ],
  "STRINGHEX256": [
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
  ],
  "STRINGHEX512": [
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
  ],
  "NUMBER": [
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
  ],
  "BOOLEAN": [
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
  ],
  "ARRAY": [
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
  ],
  "OBJECT": [
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
  ],
  "STRINGORNOTHING": [
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
  ],
  "STRINGEMAILORNOTHING": [
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
  ],
  "STRINGHEXORNOTHING": [
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
  ],
  "STRINGHEX32ORNOTHING": [
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
  ],
  "STRINGHEX64ORNOTHING": [
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
  ],
  "STRINGHEX128ORNOTHING": [
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
  ],
  "STRINGHEX256ORNOTHING": [
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
  ],
  "STRINGHEX512ORNOTHING": [
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
  ],
  "NUMBERORNOTHING": [
    [null, false],
    [{}, false],
    [[], false],
    [false, false],
    [undefined, true],
    [123, true],
    ["123", false],
    [NaN, true]
    [undefined, true],
    [0, true],
    [1, true],
    [-1, true],
    [1.23, true],
    [-1.23, true],
    [1e10, true],
    [-1e10, true],
    [Infinity, true],
    [-Infinity, true],
    ["", false],
    [" ", false],
    ["0x11", false]
  ],
  "BOOLEANORNOTHING": [
    ["", false]
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
  ],
  "ARRAYORNOTHING": [
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
  ],
  "OBJECTORNOTHING": [
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
  ],
  "STRINGORNULL": [
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
  ],
  "STRINGEMAILORNULL": [
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
  ],
  "STRINGHEXORNULL": [
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
  ],
  "STRINGHEX32ORNULL": [
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
    ["a".repeat(33), false]
    ["a".repeat(31), false]
  ],
  "STRINGHEX64ORNULL": [
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
  ],
  "STRINGHEX128ORNULL": [
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
  ],
  "STRINGHEX256ORNULL": [
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
  ],
  "STRINGHEX512ORNULL": [
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
  ],
  "NUMBERORNULL": [
    [undefined, false],
    [false, false],
    [null, true],
    [123, true],
    [NaN, true],
    [0, true],
    [1, true],
    [-1, true],
    [1.23, true],
    [-1.23, true],
    [1e10, true],
    [-1e10, true],
    ["123", false],
    [Infinity, true],
    [-Infinity, true],
    ["", false],
    [" ", false],
    [[], false],
    [{}, false],
    ["0x11", false]
  ],
  "BOOLEANORNULL": [
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
  ],
  "ARRAYORNULL": [
    ["asd", false]
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
  ],
  "NONNULLOBJECT": [
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
  ],
  "NONEMPTYSTRING": [
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
  ],
  "NONEMPTYARRAY": [
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
  ],
  "NONEMPTYSTRINGHEX": [
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
  ],
  "NONEMPTYSTRINGCLEAN": [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["Hello", true],
    ["こんにちは", true],
    ["abc\x00def", false],
    ["line\nbreak", true],
    ["tab\tchar", true],
    ["💩", true],
    ["visible space ", true],
    ["abc\u200bdef", false], 
    ["abc\uFEFFdef", false], 
    ["abc\u202Edef", false],  
    ["", false],
    [" ", true],
    ["a", true],
    ["hello world", true],
    ["こんにちは", true],
    ["🙂", true],
    ["abc\u200bdef", false],
    ["abc\u200ddef", false],
    ["abc\uFEFFdef", false],
    ["\u00A0", false],
    ["\t", true],
    ["\n", true],
    ["💩", true],
    ["abc\x00def", false],
    ["abc\r\n", true],
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", true],
    ["a".repeat(1024), true]
  ],

  "STRINGCLEAN": [
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    ["Hello", true],
    ["こんにちは", true],
    ["abc\x00def", false],
    ["line\nbreak", true],
    ["tab\tchar", true],
    ["💩", true],
    ["visible space ", true],
    ["abc\u200bdef", false], 
    ["abc\uFEFFdef", false], 
    ["abc\u202Edef", false],  
    ["", true],
    [" ", true],
    ["a", true],
    ["hello world", true],
    ["こんにちは", true],
    ["🙂", true],
    ["abc\u200bdef", false],
    ["abc\u200ddef", false],
    ["abc\uFEFFdef", false],
    ["\u00A0", false],
    ["\t", true],
    ["\n", true],
    ["💩", true],
    ["abc\x00def", false],
    ["abc\r\n", true],
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", true],
    ["a".repeat(1024), true]
  ],
  "STRINGCLEANORNULL": [
    [undefined, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [null, true],
    ["こんにちは", true],
    ["abc\x00def", false],
    ["line\nbreak", true],
    ["tab\tchar", true],
    ["💩", true],
    ["visible space ", true],
    ["abc\u200bdef", false], 
    ["abc\uFEFFdef", false], 
    ["abc\u202Edef", false],
    ["Hello", true],
    ["こんにちは", true],
    ["abc\x00def", false],
    ["line\nbreak", true],
    ["tab\tchar", true],
    ["💩", true],
    ["visible space ", true],
    ["abc\u200bdef", false], 
    ["abc\uFEFFdef", false], 
    ["abc\u202Edef", false],  
    ["", true],
    [" ", true],
    ["a", true],
    ["hello world", true],
    ["こんにちは", true],
    ["🙂", true],
    ["abc\u200bdef", false],
    ["abc\u200ddef", false],
    ["abc\uFEFFdef", false],
    ["\u00A0", false],
    ["\t", true],
    ["\n", true],
    ["💩", true],
    ["abc\x00def", false],
    ["abc\r\n", true],
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", true],
    ["a".repeat(1024), true]
  ],
  "STRINGCLEANORNOTHING": [
    [null, false],
    [{}, false],
    [[], false],
    [0, false],
    [false, false],
    [undefined, true],
    ["こんにちは", true],
    ["abc\x00def", false],
    ["line\nbreak", true],
    ["tab\tchar", true],
    ["💩", true],
    ["visible space ", true],
    ["abc\u200bdef", false], 
    ["abc\uFEFFdef", false], 
    ["abc\u202Edef", false],  
    ["Hello", true],
    ["こんにちは", true],
    ["abc\x00def", false],
    ["line\nbreak", true],
    ["tab\tchar", true],
    ["💩", true],
    ["visible space ", true],
    ["abc\u200bdef", false], 
    ["abc\uFEFFdef", false], 
    ["abc\u202Edef", false],  
    ["", true],
    [" ", true],
    ["a", true],
    ["hello world", true],
    ["こんにちは", true],
    ["🙂", true],
    ["abc\u200bdef", false],
    ["abc\u200ddef", false],
    ["abc\uFEFFdef", false],
    ["\u00A0", false],
    ["\t", true],
    ["\n", true],
    ["💩", true],
    ["abc\x00def", false],
    ["abc\r\n", true],
    ["𝔘𝔫𝔦𝔠𝔬𝔡𝔢", true],
    ["a".repeat(1024), true]
  ],

  "OBJECTCLEAN":[
    ["", false]
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
  ],
  "NONNULLOBJECTCLEAN":[
    ["", false]
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
    [{["__proto__"]: {"polluted": true}}, false]
    [{"nested": {"x": {"constructor": {"prototype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constrctor": {"prototype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constructor": {"prottype": {"polluted": true}}}}}, false],
    [{"nested": {"x": {"constructr": {"prottype": {"polluted": true}}}}}, true],
    [{"nested": {"x": {"constructr": {["__proto__"]: {"polluted": true}}}}}, false]
  ],
  "OBJECTCLEANORNOTHING": [
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
}
#endregion

