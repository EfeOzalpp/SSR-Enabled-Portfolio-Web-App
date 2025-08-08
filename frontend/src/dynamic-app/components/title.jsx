// Updated TitleDivider component
import { useStyleInjection } from '../../utils/context-providers/style-injector.ts';
import titleCss from '../../styles/dynamic-app/title.css?raw';

const TitleDivider = ({ svgIcon, movingTextColors, pauseAnimation }) => {
  const [color1, color2, color3] = movingTextColors || ['#70c6b0', '#5670b5', '#50b0c5'];
  
  useStyleInjection(titleCss, 'dynamic-app-style-title');
  
  // Adjust hex brightness
  const adjustBrightness = (hex, multiplier) => {

    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.max(0, Math.floor(r * multiplier)));
    g = Math.min(255, Math.max(0, Math.floor(g * multiplier)));
    b = Math.min(255, Math.max(0, Math.floor(b * multiplier)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };


  const colors = [
    adjustBrightness(color1, 1.05),
    adjustBrightness(color2, 1.25),
    adjustBrightness(color3, 1.1),
  ];

  const textSegments = [
    { text: 'Institute', suffix: '' },
    { text: 'Dyna', suffix: 'mic Media' },
    { text: 'Dyn', suffix: 'mic Media' },
  ];

  // Generate moving text spans
  const renderMovingContent = (repeatCount = 2) => {
    return [...Array(repeatCount)].flatMap((_, repeatIndex) =>
      textSegments.map((segment, i) => (
        <span
          key={`${repeatIndex}-${i}`}
          className="moving-text"
          style={{ color: colors[i] }}
        >
          {segment.text}
          <span className="logo-container">
            <span
              className="svg-icon"
              style={{ fill: colors[i] }}
              dangerouslySetInnerHTML={{ __html: svgIcon }}
            />
          </span>
          {segment.suffix}
        </span>
      ))
    );
  };

  return (
    <div className="title-container">
      <div className="static-title">
        <h1>MassArt 2025</h1>
      </div>
      <div className={`moving-title ${pauseAnimation ? 'paused' : ''}`}>
        <h1 className="title-with-icon moving-text-wrapper">
          {renderMovingContent()}
        </h1>
      </div>
    </div>
  );
};

export default TitleDivider;