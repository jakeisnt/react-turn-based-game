import { Title, Text, Page } from "../components";

/** This page provides some information about the game, its creators, etc. */

function About() {
  return (
    <Page>
      <Title>About</Title>
      <Text>
        This is a sample about page. It has some information about the creators
        of this game.
      </Text>
      <Text>
        You can find the source code to this repository{" "}
        <a
          href="https://github.com/jakeisnt/react-turn-based-game"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        . Feel free to open a pull request!
      </Text>
    </Page>
  );
}

export default About;
