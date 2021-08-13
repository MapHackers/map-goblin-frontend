import React from 'react';
import SliderContext from './context'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import './Slider.scss'
import { Link } from 'react-router-dom';

const Slider = ({ children, title }) => {
    const { width, elementRef } = useSizeElement();
    const {
        handlePrev,
        handleNext,
        slideProps,
        containerRef,
        hasNext,
        hasPrev,
    } = useSliding(width, React.Children.count(children));

    const contextValue = {
        elementRef,
    };
    return (
        <div style={{ margin: '3vw 0' }}>
            <SliderContext.Provider value={contextValue}>
                <div
                    style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1.25vw', fontSize: '1.4vw', fontWeight: '700', margin: '0 4% .5em 55px' }}
                >
                    <Link to={`/category/${title}`}>
                        {title}
                    </Link>
                </div>
                <SliderWrapper>
                    <div
                        className={'slider'}
                    >
                       <div ref={containerRef} className="slider__container" {...slideProps}>{children}</div>
                    </div>
                    {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
                    {hasNext && <SlideButton onClick={handleNext} type="next" />}
                </SliderWrapper>
            </SliderContext.Provider>
        </div>

    );
};

export default Slider;