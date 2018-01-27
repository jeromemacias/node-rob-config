module.exports = {
    'float-percent': {
        validate: function(val) {
            if (val !== 0 && (!val || val > 1 || val < 0)) {
                throw new Error('must be a float between 0 and 1, inclusive');
            }
        },
        coerce: function(val) {
            return parseFloat(val, 10);
        }
    }
};