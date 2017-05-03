import Vector from './vector'

QUnit.test("toString returns a string representation of the vector", function( assert ) {
  var subject = new Vector(1, 1);

  assert.equal(subject.toString(), '<1, 1>');
});
