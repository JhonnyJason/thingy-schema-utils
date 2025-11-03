import { STRINGHEX, NUMBER, STRING, validate, createValidator } from "../output/index.js"

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

const compiledValidate = createValidator(schema)

export const testValidateSpeed = function(count) {
    var c = count
    var message = ""
    var start = performance.now()
    var timeMS = 0
    var err = undefined

    // warmup
    while(c--) {
        err = validate(invalidSample, schema)
        if (err !== undefined) { err = undefined } 
    }

    // Test New General Validate Speed
    c = count
    start = performance.now()
    while(c--) {
        err = validate(validSample, schema)
        if (err !== undefined) { err = undefined } 
    }
    timeMS = performance.now() - start
    message = "NewValidate - all success: "+timeMS+"ms"
    console.log(message)

    c = count
    start = performance.now()
    while(c--) {
        err = validate(validSample, schema)
        if (err !== undefined) { err = undefined } 

        err = validate(invalidSample, schema)
        if (err !== undefined) { err = undefined } 
        c--
    }
    timeMS = performance.now() - start
    message = "NewValidate - mixed: "+timeMS+"ms"
    console.log(message)

    c = count
    start = performance.now()
    while(c--) {
        err = validate(validSample, schema)
        if (err !== undefined) { err = undefined } 
    }
    timeMS = performance.now() - start
    message = "NewValidate - all failure: "+timeMS+"ms"
    console.log(message)



    // Test CompiledValidate Speed
    c = count
    start = performance.now()
    while(c--) {
        err = compiledValidate(validSample)
        if (err !== undefined) { err = undefined } 
    }
    timeMS = performance.now() - start
    message = "CompiledValidate - all success: "+timeMS+"ms"
    console.log(message)

    c = count
    start = performance.now()
    while(c--) {
        err = compiledValidate(validSample)
        if (err !== undefined) { err = undefined } 

        err = compiledValidate(invalidSample)
        if (err !== undefined) { err = undefined } 
        c--
    }
    timeMS = performance.now() - start
    message = "CompiledValidate - mixed: "+timeMS+"ms"
    console.log(message)

    c = count
    start = performance.now()
    while(c--) {
        err = compiledValidate(validSample)
        if (err !== undefined) { err = undefined } 
    }
    timeMS = performance.now() - start
    message = "CompiledValidate - all failure: "+timeMS+"ms"
    console.log(message)

}