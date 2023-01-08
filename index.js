// Placeholder keys
const requiredKeys = [
  'Name',
  'Username',
  'Email',
  'Phone',
  'Company',
  'Website',
  'City',
  'ZipCode',
];

// convert required keys to small caps
function lowercase(string) {
  return string.toLowerCase();
}

const url = 'https://jsonplaceholder.typicode.com/users';

// Function to flatten o=nested object into single object
const flattenObject = (obj) => {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value));
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
};

// Create a DOM element to handle promise
const createDomElement = (object) => {
  const gridDiv = document.createElement('div');
  gridDiv.className = 'grid-container';

  for (const [key, value] of Object.entries(object)) {
    requiredKeys.forEach((element) => {
      if (lowercase(element) === key) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerText = `${element}: ${value}`;
        gridDiv.appendChild(gridItem);
        const user = document.getElementsByClassName('users');

        user[0].appendChild(gridDiv);
        return gridItem;
      }
    });
  }

  return gridDiv;
};

// First Button - Get users button
const getUserButton = document.getElementById('get-users');

// Fetch data from fake SON API nd handle it
const getUsers = () => {
  fetch(url)
    .then((users) => users.json())
    .then((data) => {
      data.forEach((object) => {
        const newObject = flattenObject(object);
        const domElement = createDomElement(newObject);

        return domElement;
      });
    });
};

getUserButton.addEventListener('click', getUsers);

// Second Button - Get users by id button
const getUserIdBtn = document.getElementById('get-users-id');

const getUserById = () => {
  const num = document.getElementById('user-input').value;
  fetch(`${url}/${num}`)
    .then((users) => users.json())
    .then((object) => {
      const newObject = flattenObject(object);
      const domElement = createDomElement(newObject);
      // domElement.innerHTML = "";

      return domElement;
    });
};

getUserIdBtn.addEventListener('click', getUserById);
