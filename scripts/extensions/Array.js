Array.prototype.tryGet = function(x, y, defaultValueIfIssue) {
    var self = this;
    
    try {
        return self[x][y];
    } catch (error) {
        return defaultValueIfIssue;
    }
};