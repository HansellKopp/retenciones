const validators = {
  'required': {
    message: 'common:validation_errors:required',
    test: (val) => {
      return (val && val !== ''.trim())
    }
  },
  'email': {
    message: 'common:validation_errors:email',
    test: (val) => {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(val)
    }
  },
  'url': {
    message: 'common:validation_errors:url',
    test: val => {
      const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\\.\\-]+\.[a-zA-Z]{2,5}[\\.]{0,1}/
      return re.test(val)
    }
  },
  'boolean': {
    message: 'common:validation_errors:boolean',
    test: (val) => {
      return (val === '1' || val === '0' || val === 1 || val === 0)
      // return (typeof val)==='boolean';
    }
  },
  'integer': {
    message: 'common:validation_errors:integer',
    test: (val) => {
      return Number.isInteger(1 * val)
    }
  },
  'date': {
    message: 'common:validation_errors:date',
    test: (val) => {
      console.log('date validator:' + val)
      return true
    }
  },
  'numeric': {
    message: 'common:validation_errors:numeric',
    test: (val) => {
      return !isNaN(val)
    }
  },
  'string': {
    message: 'common:validation_errors:string',
    test: (val) => {
      return (typeof val) === 'string'
    }
  },
  'unique': {
    message: 'common:validation_errors:unique',
    test: () => {
      return true
    }
  }
}

export const validateFields = (values, validations) => {
  if (!validations) return null
  const errors = {}
  // eslint-disable-next-line
  Object.keys(values).map(key => {
    const value = values[key]
    const validation = validations[key]
    if (validation && key !== 'errors') {
      const error = validateField(validation.split('|'), value)
      if (error) {
        errors[key] = error
      }
    }
  })
  return Object.keys(errors).length > 0 ? errors : null
}

export const validateField = (rules, value) => {
  if (typeof rules === 'string') {
    rules = rules.split('|')
  }
  for (let index = 0; index < rules.length; index++) {
    if (validators[rules[index]]) {
      const isRulePassed = validators[rules[index]].test(value)
      if (!isRulePassed) {
        return validators[rules[index]].message
      }
    }
  }
  return null
}

export const serializeForm = (form) => {
  const data = {}
  const formData = new window.FormData(form)
  for (const s of formData.entries()) {
    data[s[0]] = s[1]
  }
  return data
}

export const dataToForm = (data) => {
  var formData = new window.FormData()
  // eslint-disable-next-line
  Object.keys(data).map(s => {
    formData.append(s, data[s])
  })
  return formData
}
