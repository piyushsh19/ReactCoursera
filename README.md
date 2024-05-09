Now let’s briefly discuss the four bullet points above.

Why use the className attribute in the JSX syntax?

Well, with JSX, it looks like HTML so much that it's easy to forget that it's actually JavaScript code - not HTML.

While regular HTML does indeed have a class attribute, which is used to list one or more CSS classes to be used on a given HTML element, this cannot really work in JSX. The reason is that JSX is a special kind of JavaScript syntax, and the word class is a reserved keyword in JSX. That's why the React team had to make a compromise and so className is used in JSX to list one or more CSS classes to be used on a given element or component.

But why use Intro1.js, Intro2.js, and Intro3.js? Isn't one of the tenets of coding the DRY approach - that is, the "Don't repeat yourself" approach?

Indeed, it is. However, there are still a few concepts to discuss before you learn how to re-use a single component with variations in its content. This has to do with data in components, but don’t worry, we’ll be getting to that later. 

The third question is about the props object. It has been mentioned before, but so far it hasn't been used. It hasn’t been used in this example either.

The answer to this question has to do with the next lesson, titled Component Use and Styling. In this lesson, you’ll see in practice how you can make components work better, with the help of props.

The final question is about not using the <a> element for empty links in my app.

The answer here depends on whether those links are "internal" - inside an app, or "external", meaning, leading to some external link, such as 
https://www.coursera.org
. If the links are internal to the app - as they are envisioned here - using the <a> tag is simply not the React way of doing things. You'll learn why that is the case when discussing the use of React Router.


Recall that much like parameters in a JavaScript function which allow you to pass in values as arguments, React uses properties, or props, to pass data between components. But how exactly do they work?

In this reading, you’ll use a transpiler to break JSX code to plain JavaScript, making its purpose more understandable.

Remember first that JSX code in React is just syntactic sugar - meaning, a nicer way to write some hard-to-read code.

For the browser to understand this syntactic sugar, you need to transpile JSX down to plain JavaScript code. You have a resource online, at the URL of 
babeljs.io
, which allows you to inspect the results of this transpiling. Once you visit the website, make sure to navigate to the Try it out link in the main navigation.

For example, let’s say you have a component that returns a piece of JSX:

123
function App() {
  return <h1>Hello there</h1>
}
… if you used the Babel transpiler to transpile this JSX syntactic sugar code down to plain JavaScript code, you’d get back some unusual code:

1234
"use strict";
function App() {
    return /*#__PURE__*/React.createElement("h1", null, "Hello there");
}
You just want to focus on the React.createElement("h1", null, "Hello there"); part. You can ignore the rest.

This means that the createElement function receives three arguments:

The wrapping element to render. 

A null value (which is there to show an absence of an expected JavaScript object value). 

The inner content that will go inside the wrapping element. 

Interestingly, the inner content that will go inside the wrapping element can also be a call to the createElement function.

For example, let’s say you have a slightly more complex JSX element structure:

1234567
function App() { 
  return (
    <div>
    <h1>Hello there</h1> 
    </div>
  )
}
… the transpiled return statement in plain JavaScript again returns two createElement functions:

1234
"use strict";
function App() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Hello there"));
}
If you format this output, remove the "use strict" line, and remove the __PURE__ comments, you get a more readable output:

1234567
function App() {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Hello there")
  );
}
So now the third argument of the outer-most React.createElement call is another React.createElement call.

This is how you can nest as many elements as you want.

This means that a nested JSX structure is just a bunch of nested React.createElement calls, passed in to other React.createElement calls as their third argument.

The second – null – argument
The second argument of null can – in this case – be replaced with an empty object.

In that case, your code would contain a pair of curly braces instead of the word null:

123456789
"use strict";

function App() {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Hello there")
  );
}
This object is referred to as the props object. It is the main mechanism of sending data from a parent component to a child component in React.

The way this works is described in React docs using the following code:

12345
React.createElement(
  type,
  [props],
  [...children]
)
The third argument (...children)
This is the inner content that will go inside the wrapping element. It's what makes it possible to nest elements inside other elements, mimicking the way that HTML works.

In this reading you’ve learned how to use a transpiler to break JSX code to plain JavaScript, making its purpose more understandable.

You can even have multiple levels of nested JSX elements, or a single JSX element having multiple children, such as, for example:

<Trunk>
    <Bag>
        <Apples color="yellow" number="5" />
        <Pears friend="Peter" />
    </Bag>
</Trunk>
, Apples is a prop of the Bag component. To explain further, the Bag component can wrap the Apples component, or any other component, because I used the {props.children} syntax in the Bag component function declaration. In other words, just like in the real world, when you take a bag to a grocery store, you can “wrap” a wide variety of groceries inside the bag, you can do the same thing in React: wrap a wide variety of components inside the Bag component, using the children prop to achieve this.

JSX Styling

There are various ways to style JSX elements.

Probably the simplest way to do this is using the link HTML element in the head of the index.html file in which your React app will mount.

The href attribute loads some CSS styles, probably with some CSS classes, and then, inside the function component's declarations, you can access those CSS classes using the className attribute.

Another way to add CSS styles to components is using inline styles.

The syntax of inline styles in JSX is a bit custom.

function Promo(props) {
    return (
        <div className="promo-section">
            <div>
                <h1 style={{color:"tomato", fontSize:"40px", fontWeight:"bold"}}>
                    {props.heading}
                </h1>
            </div>
            <div>
                <h2>{props.promoSubHeading}</h2>
            </div>
        </div>
    );
}

export default Promo;

As explained previously, this means that whatever code you add inside these opening and closing curly braces is to be parsed as regular JavaScript. Now let’s add a style object literal inside of these curly braces:

<h2>
, since it's just JavaScript, those CSS properties that would be hyphenated in plain CSS, such as, for example, font-size:40px, become camelCased, and the value is a string, making it look like this: fontSize:"40px".<h2/>

JSX syntax and the arrow function
Components as Function Expressions
Up to this point, you’ve likely only observed ES5 function declarations used to define components in React. However, this is not the only way to do it.

Function Expressions

Let’s start with a function declaration used as a component in React:
function Nav(props) {
    return (
        <ul>
            <li>{props.first}</li>
        </ul>
    )
}

This component's code returns a list item containing the value of the ‘first’ prop.

Now, let's change this function declaration to a function expression:

1234567
const Nav = function(props) {
    return (
        <ul>
            <li>{props.first}</li>
        </ul>
    )
}
The component is, for the most part, the same. The only thing that's changed is that you’re now using an anonymous (nameless) function, and assigning this anonymous function declaration to a variable declared using the const keyword, and the name Nav. The rest of the code is identical.

const Nav = function(props) {
    return (
        <ul>
            <li>{props.first}</li>
        </ul>
    )
}

Changing a component from a function declaration to a function expression doesn't change its behavior, or how you write the code to render the Nav component. It's still the same:

<Nav first="Home" />

Components as Arrow Functions
Arrow functions are a core feature of the ES6 version of JavaScript.

One of the main benefits of using arrow functions is its shorter syntax.

Consider the Nav function expression written as an arrow function:

const Nav = (props) => {
    return (
        <ul>
            <li>{props.first}</li>
        </ul>
    )
}

So, the way to think about this is the following:

The arrow itself can be thought of as the replacement for the function keyword. 

The parameters that this arrow function accepts are listed before the arrow itself. 

To reiterate, take the smallest possible anonymous ES5 function:
const example = function() {}
And then observe how this is written as an arrow function:


const example = () => {}

<h1>Another important rule regarding arrow functions is that using the parentheses is optional if there's a single parameter that a function accepts.


In other words, another correct way to write the previous Nav arrow function component would be to drop the parentheses around ‘props’:

const Nav = props => {
    return (
        <ul>
            <li>{props.first}</li>
        </ul>
    )
}
</h1>
