/* const isValid = (name) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;

  return true;
};

/* const Joi = require('joi');

const obj = {
  id: 1,
  name: 'Martelo de Thor',
};

const schemaName = Joi.object({
  name: Joi.string().min(6).required()
    .messages({
      'string.empty': '"name" is required',
      'string.min': '"name" length must be at least 5 characters long',
    }),
});

const isValid = schemaName.validate(obj); */

/* module.exports = isValid; */

// sem campo name 404 -  { "message": "\"name\" is required" }
// name.length < 5 - { "message": "\"name\" length must be at least 5 characters long" } */