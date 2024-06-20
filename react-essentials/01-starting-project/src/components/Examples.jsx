import { useState } from "react";

import TabButton from "./TabButton";
import TabContent from "./TabContent/TabContent";
import { EXAMPLES } from "../data.js";

export default function Examples() {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  return (
    <>
      <section id="examples">
        <h2>
          Examples
        </h2>
        <menu>
          <TabButton onClick={() => { setSelectedTopicIndex(0); }} isSelected={selectedTopicIndex == 0}>Component</TabButton>
          <TabButton onClick={() => { setSelectedTopicIndex(1); }} isSelected={selectedTopicIndex == 1}>JSX</TabButton>
          <TabButton onClick={() => { setSelectedTopicIndex(2); }} isSelected={selectedTopicIndex == 2}>Props</TabButton>
          <TabButton onClick={() => { setSelectedTopicIndex(3); }} isSelected={selectedTopicIndex == 3}>State</TabButton>
        </menu>
      </section>
      <TabContent {...EXAMPLES[selectedTopicIndex]} />
    </>
  );
}