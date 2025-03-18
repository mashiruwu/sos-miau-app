import './Slider.css';
import { useState, useRef } from 'react';
import { Card } from './subComponents/card/Card'

export function Slider() {
    const slide =  useRef<HTMLDivElement>(null); // Use useRef for DOM reference
    const [isDragging, setIsDragging] = useState(false);
    const [inTransform, setInTransform] = useState(false);

    const [transition, setTransition] = useState(0);
    const [transformRotate, setTransformRotate] = useState(0);
    const [transformTranslate, setTransformTranslate] = useState([0, "px"]); // Fixed typo

    const [startX, setStartX] = useState(0);
    const deltaXRef = useRef(0); // Use useRef for immediate access to deltaX

    function mouseDown(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();

        if (!inTransform) {
            setStartX(e.clientX);
            deltaXRef.current = 0; // Reset deltaX
            setIsDragging(true);
        }
    }

    function mouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!isDragging || inTransform) return;

        const deltaX = e.clientX - startX;
        deltaXRef.current = deltaX; // Update deltaXRef
        setTransformTranslate([deltaX, "px"]); // Update translate state
        setTransformRotate(0.02 * deltaX); // Update rotate state
    }

    function mouseUp() {
        if (isDragging && slide.current) {
            setIsDragging(false);
            if (!inTransform) {
                setInTransform(true);
                const deltaX = deltaXRef.current;

                if (deltaX > slide.current.clientWidth / 4) {
                    like();
                } else if (deltaX < -slide.current.clientWidth / 4) {
                    dislike();
                } else {
                    resetSlide();
                }
            }
        }
    }

    function resetSlide() {
        setTransition(Math.min(Math.abs(deltaXRef.current) * 0.01, 0.5));
        setTransformTranslate([0, "%"]);
        setTransformRotate(0);

        setTimeout(() => {
            setTransition(0);
            setInTransform(false);
        }, 500);
    }

    function like() {
        setTransition(0.5);
        setTransformTranslate([200, "%"]);
        setTransformRotate(-20);

        console.log('Like');

        setTimeout(() => {
            resetAfterAction();
        }, 500);
    }

    function dislike() {
        setTransition(0.5);
        setTransformTranslate([-200, "%"]);
        setTransformRotate(20);

        console.log('Dislike');

        setTimeout(() => {
            resetAfterAction();
        }, 500);
    }

    function resetAfterAction() {
        setTransition(0);
        setTransformTranslate([0, "%"]);
        setTransformRotate(0);
        nextSlide();
        setInTransform(false);
    }

    function nextSlide() {
        console.log('change picture');
    }

    return (
        <>
            <div className="chose" 
                onMouseMove={(e) => mouseMove(e)}
                onMouseUp={() => mouseUp()}>
                    
                <div className="option">
                    <button id="dislike" onClick={() => dislike()}>
                        <img src="./src/components/Slider/assets/X.png"></img>
                    </button>
                </div>
                <div
                    className="slide"
                    id="slide"
                    ref={slide}
                    style={{
                        transition: `transform ${transition}s ease`,
                        transform: `translateX(${transformTranslate[0]}${transformTranslate[1]}) rotate(${transformRotate}deg)`,
                    }}
                    onMouseDown={(e) => mouseDown(e)}
                >
                    <Card></Card>
                </div>
                <div className="additional-div">
                    <Card></Card>
                </div>
                <div className="additional-div2"></div>
                <div className="option">
                    <button id="like" onClick={() => like()}>
                        <img src="./src/components/Slider/assets/Hearth.png"></img>
                    </button>
                </div>
            </div>
        </>
    );
}