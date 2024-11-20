
import '../css/backgroundAnimation.css'; // Assuming CSS is here

const BackgroundAnimation = () => (
    <div className="animation-area">
        <ul className="animation-circles">
            {Array.from({ length: 20 }, (_, i) => <li key={i}></li>)}
        </ul>
    </div>
);

export default BackgroundAnimation;
