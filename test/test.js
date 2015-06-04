describe("Family Tree", function() {

  var nancy;

  beforeEach(function() {
    nancy = new FamilyTree('Nancy').addChildren('Adam','Jill','Carl');
    nancy.getPerson('Carl').addChildren('Catherine','Joseph');
    nancy.getPerson('Jill').addChild('Kevin').addChildren('Samuel','George','James','Aaron');
    nancy.getPerson('James').addChild('Mary');
    nancy.getPerson('George').addChildren('Patrick', 'Robert');
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

    it("should find a person", function(){
      expect(nancy.getPerson('Carl').name).to.equal('Carl');
      expect(nancy.getPerson('James').name).to.equal('James');
      expect(nancy.getPerson('Betty')).to.equal(null);
    })

    it("should find all names in tree", function(){
      expect(nancy.findAllPeople().sort()).to.deep.equal(['Adam','Samuel','Patrick','Robert','Mary','Aaron','Catherine','Joseph', 'Nancy', 'Kevin', 'Jill', 'George', 'James', 'Carl'].sort())
    })

  })

  describe("Search Methods", function() {

    it("should find grandparents", function() {
      expect(nancy.findGrandparent('Kevin')).to.equal('Nancy');
      expect(nancy.findGrandparent('Mary')).to.equal('Kevin');
      expect(nancy.findGrandparent('Catherine')).to.equal('Nancy');
    });

    it("should find all only children", function() {
      expect(nancy.findOnlyChildren().sort()).to.deep.equal(['Nancy', 'Kevin','Mary'].sort());
    });

    it("should find all childless", function() {
      expect(nancy.findChildless().sort()).to.deep.equal(['Adam','Samuel','Patrick','Robert','Mary','Aaron','Catherine','Joseph'].sort());
    });

    it("should find grandparent with most grandkids", function() {
      expect(nancy.findMostFruitful()).to.equal("Jill");
    });

  })  


});
