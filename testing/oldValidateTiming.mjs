import { STRINGHEX, NUMBER, STRING, validate } from "thingy-schema-validate"

const schema = {
    apiKey: STRINGHEX,
    timeout: NUMBER,
    retries: NUMBER,
    endpoint: STRING 
}

const validSample =  {
    apiKey: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
    timeout: 30,
    retries: 3,
    endpoint: "https://api.example.com/v1"
}

const invalidSample = {
    apiKey: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
    timeout: 30,
    retries: 3
}


export const testValidateSpeed = function(count) {
    var c = count
    var message = ""
    var start = performance.now()
    var timeMS = 0
    var err = undefined

    // warmup
    while(c--) {
        try {
            validate(invalidSample, schema)
        } catch (error) {
            err = undefined
        }
    }

    c = count
    start = performance.now()
    while(c--) {
        try {
            validate(validSample, schema)
        } catch (error) {
            err = undefined
        }
    }
    timeMS = performance.now() - start
    message = "ThingySchemaValidate - all success: "+timeMS+"ms"
    console.log(message)

    c = count
    start = performance.now()
    while(c--) {
        try {
            validate(validSample, schema)
        } catch (error) {
            err = undefined
        }
        try {
            validate(invalidSample, schema)
        } catch (error) {
            err = undefined
        }
        c--
    }
    timeMS = performance.now() - start
    message = "ThingySchemaValidate - mixed: "+timeMS+"ms"
    console.log(message)

    c = count
    start = performance.now()
    while(c--) {
        try {
            validate(invalidSample, schema)
        } catch (error) {
            err = undefined
        }
    }
    timeMS = performance.now() - start
    message = "ThingySchemaValidate - all failure: "+timeMS+"ms"
    console.log(message)

}