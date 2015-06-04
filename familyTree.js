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

FamilyTree.prototype.findGrandparent = function(grandchild) {
	if (this.name === grandchild) { return this.parent.parent ? this.parent.parent.name : null; }
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i].findGrandparent(grandchild)) { return this.children[i].findGrandparent(grandchild);}
	}
}

FamilyTree.prototype.findAllPeople = function(names) {
	names = names || [];
	names.push(this.name);
	this.children.forEach(function(child) {
		child.findAllPeople(names);
	})
	return names;
}

FamilyTree.prototype.findOnlyChildren = function(onlyChildren) {
	if (!onlyChildren) { onlyChildren = [this.name]; }
	if (this.children.length === 1) { onlyChildren.push(this.children[0].name); }
	this.children.forEach(function(child) {
		child.findOnlyChildren(onlyChildren);
	});
	return onlyChildren;
}

FamilyTree.prototype.findChildless = function(childless) {
	childless = childless || [];
	if (this.children.length === 0) { childless.push(this.name); }
	this.children.forEach(function(child) {
		child.findChildless(childless);
	});
	return childless;
}

FamilyTree.prototype.findMostFruitful = function() {	
	var	mostFruitful = { grandchildren: 0 };
	 var traverse = function(node) {
		node.children.forEach(function(child) {
			if (child.children.length > mostFruitful.grandchildren) {
				mostFruitful = { name:node.name, grandchildren: child.children.length }
			}
			traverse(child);
		})
	};
	traverse(this);
	return mostFruitful.name;
}