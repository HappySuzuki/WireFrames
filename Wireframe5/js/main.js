var people = [
  {
    name: 'test1',
    age: 13
  },
  {
    name: 'test2',
    age: 14
  },
  {
    name: 'test2',
    age: 15
  }
];

let result = document.getElementById('result');

for (var i = 0; i < people.length; i++) {
  var person = people[i];

  result.innerHTML =
    result.innerHTML +
    '<div class="person"> Name is' +
    '<span class="name">' +
    person.name +
    '</span>' +
    ' and Age is' +
    '<span class="age">' +
    person.age +
    ' </span>' +
    '</div>';
}
