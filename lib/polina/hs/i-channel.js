


/**
 * @interface
 */
polina.hs.IChannel = function() {};


/**
 * @param {!polina.hs.Index} index
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hs.IChannel.prototype.openIndex =
    function(index, complete, cancel) {};
