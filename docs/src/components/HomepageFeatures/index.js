import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: "Live Cryptocurrency Prices",
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
      This platform fetches real-time cryptocurrency prices using the
      CoinGecko API, ensuring you always have the latest market data.
    </>
    ),
  },
  {
   title: "Efficient API Integration",
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
      The Crypto Price Tracker seamlessly integrates with CoinGecko API
      using React Query, ensuring optimized and cached API calls for
      performance.
    </>
    ),
  },
  {
    title: "Optimized for Performance",
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      Built with Next.js, React Query, and TailwindCSS v4, this
      project is designed for fast load times, mobile responsiveness, and
      scalability.
    </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
