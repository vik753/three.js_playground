import React from "react";
import FlyingBox from "./examples/FlyingBox";
import FallingToruses from "./examples/FallingToruses";
import Jupiter from "./examples/Jupiter";
import Butterfly from "./examples/Butterfly";
import FontExample from "./examples/FontExample";
import Playground from "./examples/Playground";

function App() {

  return (
    <div className="App"  >
      <h2 style={{ textAlign: "center" }}>Hello three.js</h2>
      {/*<FallingToruses />*/}
      {/*<FlyingBox />*/}
      {/*<Jupiter/>*/}
      {/*<Butterfly />*/}
      {/*<FontExample />*/}
      <Playground />
    </div>
  );
}

export default App;
