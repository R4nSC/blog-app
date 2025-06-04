---
title: "Understanding React Hooks"
date: "2025-05-28"
excerpt: "Dive into React Hooks and learn how they can simplify your React components."
author: "John Smith"
tags: ["React", "Hooks", "JavaScript"]
---

# Understanding React Hooks

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class.

## Common Hooks

- **useState**: Adds state to functional components
- **useEffect**: Performs side effects in functional components
- **useContext**: Subscribes to React context
- **useReducer**: Manages complex state logic
- **useCallback**: Memoizes callback functions
- **useMemo**: Memoizes expensive calculations

## Example: useState

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Example: useEffect

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Learn More

To learn more about React Hooks, check out the [React documentation](https://reactjs.org/docs/hooks-intro.html).
