describe("Family Tree", function() {

  var nancy, kevin;

  beforeEach(function() {
    nancy = new FamilyTree('Nancy').addChildren('Adam','Jill','Carl');
    nancy.getChild('Carl').addChildren('Catherine','Joseph');
    kevin = nancy.getChild('Jill').addChild('Kevin');
    kevin.addChildren('Samuel','George','James','Aaron');
    kevin.getChild('James').addChild('Mary');
    kevin.getChild('George').addChildren('Patrick', 'Robert');
  });
  
  describe("Child Methods", function() {

    it("should create new nodes with names", function(){
      expect(nancy.name).to.equal('Nancy');
    });

    it("should add a child", function(){
      nancy = new FamilyTree('Nancy');
      nancy.addChild('Adam');
      expect(nancy.children.length).to.equal(1);
      expect(nancy.children[0].name).to.equal('Adam');
    });  

    it("should add children", function(){
      expect(nancy.children.length).to.equal(3);
    });

    it("should find a child", function(){
      expect(nancy.getChild('Carl').name).to.equal('Carl');
      expect(nancy.getChild('Betty')).to.equal(null);
    })

  })

  describe("Search Methods", function() {

    it("should find grandparents", function() {
      expect(nancy.findGrandparent('Kevin')).to.equal('Nancy');
      expect(nancy.findGrandparent('Mary')).to.equal('Kevin');
      expect(nancy.findGrandparent('Catherine')).to.equal('Nancy');
    });

  })  


});
