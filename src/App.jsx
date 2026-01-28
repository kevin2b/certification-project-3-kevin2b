/** Component Imports */
import Example from './components/Example'

/**
 * This is the entry point for your react-app
 *  1. We strongly recommend comparmentalizing your code into Components
 *  2. We strongly recommend using the components folder and following whatever structure you like (for e.g., atomic design, feature-based, etc)
 *  3. We strongly recommend using a modular-approach to CSS:
 *    - An example has been provided for you, see the 'Example' component
 *    - The 'Example.jsx' component comes with an 'Example.module.css'
 *    - Pay attention to variable file import (gives access to CSS variables)
 *    - Pay special attention to how we apply the className from the imported 'styles'
 *  4. We added additional comments below to guide you
 */

const App = () => {
  return (
    <div>
      {<Example /> /** You can remove this when you wish, it's provided as an example of modular styling */}

      <p> This is your starting point! </p>
    </div>
  )
}

export default App;
