function FamilyTree(name, parent) {
	this.children = [];
	this.name = name;
	this.parent = parent;
	return this;
}

FamilyTree.prototype.addChildren = function(children) {
	var _this = this
	var args = Array.prototype.slice.call(arguments);
	args.forEach(function(child){ 
		_this.children.push(new FamilyTree(child, _this));	
	});
	return this;
}

FamilyTree.prototype.addChild = function(child) {
	child = new FamilyTree(child, this);
	this.children.push(child);
	return child;
}

FamilyTree.prototype.getChild = function(child) {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i].name == child) { return this.children[i]; }
	};
	return null;
}