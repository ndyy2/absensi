import Script from "next/script";
import styles from "./LandingPageTemplate.module.css";
import { Container } from "./components/Container";
import { InlineCode } from "./components/InlineCode";
import { Link } from "./components/Link";
import { Paragraph } from "./components/Paragraph";
import { Section } from "./components/Section";
import { Subtitle } from "./components/Subtitle";
import { TechnologyGrid } from "./components/TechnologyGrid";
import { H1, H2 } from "./components/headings";
import { technologies } from "./technologies";

const LandingPageTemplate = () => {
  const onConfettiLoad = () => {
    const key = "create-next-stack-hasShownConfetti-absensi";
    const hasShownConfetti = localStorage.getItem(key);
    if (hasShownConfetti != null) return;

    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    (function frame() {
      const timeLeft = animationEnd - Date.now();

      (window as any).confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: Math.max(200, 500 * (timeLeft / duration)),
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: [
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff",
        ],
        shapes: ["square", "circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.8, 1.2),
        drift: randomInRange(-0.1, 0.1),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();

    localStorage.setItem(key, "true");
  };

  return (
    <div className={styles.landingPageTemplate}>
      <Script
        src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.9.3/tsparticles.confetti.bundle.min.js"
        onLoad={onConfettiLoad}
      />
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            line-height: 1.5;
          }
        `}
      </style>
      <main>
        <Section>
          <Container center className={styles.headerSection}>
            <H1>
              <span className={styles.textGradient}>Your project is a go!</span>{" "}
              🎉
            </H1>
            <Subtitle>
              Get started by editing <InlineCode>pages/index.tsx</InlineCode>
            </Subtitle>
          </Container>
        </Section>
        <Section>
          <Container className={styles.textContainer}>
            <H2>Final steps</H2>
            <Paragraph>
              There are a few final steps that we were not able to perform
              automatically. We have provided a complete list for you in the{" "}
              <InlineCode>README.md</InlineCode> file. You should take care of
              these before you can start developing your project.
            </Paragraph>
          </Container>
        </Section>
        <Section>
          <Container className={styles.technologyGridIntro}>
            <H2>Technologies</H2>
            <Paragraph>
              Below you will find an overview of your chosen technologies
              providing you helpful links and simple usage examples to get you
              started.
            </Paragraph>
          </Container>
          <Container wide>
            <TechnologyGrid
              technologies={technologies}
              className={styles.technologyGrid}
            />
          </Container>
        </Section>
      </main>
      <footer>
        <Section>
          <Container center>
            <Paragraph>
              Generated by{" "}
              <Link href="https://www.create-next-stack.com">
                Create Next Stack
              </Link>
            </Paragraph>
          </Container>
        </Section>
      </footer>
    </div>
  );
};

export default LandingPageTemplate;
