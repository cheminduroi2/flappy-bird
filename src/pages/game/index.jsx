import React, { useState, useEffect } from 'react';
import { Bird } from '../../components/bird/index';
import { Pipe } from '../../components/pipe/index';
import { CONSTANTS } from '../../util/constants';
import './index.css';

export const Game = (props) => {
    const { BIRD_SIZE, DEFAULT_BIRD_POSITION, GAME_HEIGHT, GAME_WIDTH, GRAVITY, JUMP_HEIGHT, PIPE_WIDTH, PIPE_GAP } = CONSTANTS;

    const gameContainerStyles = {
        height: `${GAME_HEIGHT}px`,
        width: `${GAME_WIDTH}px`
    };

    const [birdPosition, setBirdPosition] = useState(DEFAULT_BIRD_POSITION);
    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [topPipeHeight, setTopPipeHeight] = useState(100);
    const [pipeLeftPosition, setPipeLeftPosition] = useState(GAME_WIDTH - PIPE_WIDTH)
    const [score, setScore] = useState(0);

    let bottomPipeHeight = GAME_HEIGHT - PIPE_GAP - topPipeHeight;

    // update bird position
    useEffect(() => {
        let setBirdPosInterval;

        if (hasGameStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
            setBirdPosInterval = setInterval(() => {
                setBirdPosition(birdPosition + GRAVITY)
            }, 24);
        }

        return () => clearInterval(setBirdPosInterval);
    }, [birdPosition, hasGameStarted]);

    // update pipes position, right to left
    useEffect(() => {
        let setPipePosInterval;

        if (hasGameStarted && pipeLeftPosition >= -PIPE_WIDTH) {
            setPipePosInterval = setInterval(() => {
                setPipeLeftPosition(pipeLeftPosition - 5);
            }, 24);

            return () => clearInterval(setPipePosInterval);
        } else {
            setPipeLeftPosition(GAME_WIDTH - PIPE_WIDTH);
            setTopPipeHeight(Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP)));
            if (hasGameStarted) {
                setScore(score + 1);
            }
        }
    }, [pipeLeftPosition, hasGameStarted]);

    // reset game if bird collides with pipes
    useEffect(() => {
        const isBirdInVertCollisionZoneOfTopPipe = birdPosition >= 0 && birdPosition < topPipeHeight;
        const isBirdInVertCollisionZoneOfBottomPipe = birdPosition <= GAME_HEIGHT && birdPosition > GAME_HEIGHT - bottomPipeHeight;
        const arePipesInHorizCollisionZoneOfBird = pipeLeftPosition > -PIPE_WIDTH && pipeLeftPosition <= PIPE_WIDTH;

        if (
            arePipesInHorizCollisionZoneOfBird &&
            (isBirdInVertCollisionZoneOfTopPipe || isBirdInVertCollisionZoneOfBottomPipe)
        ) {
            setHasGameStarted(false);
            setScore(0);
            setBirdPosition(DEFAULT_BIRD_POSITION);
        }
    }, [birdPosition, topPipeHeight, bottomPipeHeight, pipeLeftPosition]);

    const onScreenTap = () => {
        let newBirdPosition = birdPosition - JUMP_HEIGHT;
        if (!hasGameStarted) {
            setHasGameStarted(true);
        } else if (newBirdPosition < 0) {
            setBirdPosition(0);
        } else {
            setBirdPosition(newBirdPosition);
        }
    }
    
    return (
        <div className="game" onClick={onScreenTap}>
            <div className="game-container" style={gameContainerStyles}>
                <Pipe 
                    top={0}
                    height={topPipeHeight}
                    leftPosition={pipeLeftPosition} />
                <Pipe 
                    top={GAME_HEIGHT - (topPipeHeight + bottomPipeHeight)}
                    height={bottomPipeHeight}
                    leftPosition={pipeLeftPosition} />
                <Bird top={birdPosition}/>
            </div>
            <span>{score}</span>
        </div>
    );
};