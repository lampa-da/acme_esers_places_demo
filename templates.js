const nav = ({users, places}) =>`
<ul id="nav">
  <li><a href='/'>Home</a></li>
  <li><a href='/users'>Users (${users.length})</a></li>
  <li><a href='/places'>Places(${places.length})</a></li>
</ul>
`;

const head =({title})=>`
<head>
  <link rel='stylesheet' href='/assets/style.css' />
  <title>${title}</title>
</head>
`;

module.exports ={
  nav,
  head
};