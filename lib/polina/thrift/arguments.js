


/**
 * @constructor
 *
 * @param {number} type
 * @param {string|Object|number|Boolean} value
 * @param {number} id
 * @param {polina.thrift.Types=} opt_vtype
 * @param {polina.thrift.Types=} opt_ktype
 */
polina.thrift.Argument = function(type, value, id, opt_vtype, opt_ktype) {

  /**
   * @type {number}
   */
  this.id = id;

  /**
   * @type {number}
   */
  this.type = type;

  /**
   * Wrap Map, List and Set
   */

  this.data = value;

  if (typeof value === 'object' && value !== null) {
    if ((type === polina.thrift.Types.MAP) && opt_ktype && opt_vtype) {
      this.data = new polina.thrift.Map(value, opt_ktype, opt_vtype);
    } else if (opt_vtype &&
        (type === polina.thrift.Types.LIST ||
            type === polina.thrift.Types.SET)) {
      this.data = new polina.thrift.TArray(value, opt_vtype);
    }
  }

};
