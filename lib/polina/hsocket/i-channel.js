


/**
 * @interface
 */
polina.hsocket.IChannel = function() {};


/**
 * @param {!polina.hsocket.Index} index
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hsocket.IChannel.prototype.openIndex =
    function(index, complete, cancel) {};
