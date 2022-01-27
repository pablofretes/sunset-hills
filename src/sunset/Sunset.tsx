import React, { useEffect, useState } from "react";

type BuildingArray = {
    height: number,
    sunset: string
}

const Sunset: React.FC = () => {
    const [inputArray, setInputArray] = useState<number[]>([]);
    const [buildingArray, setBuildingArray] = useState<BuildingArray[]>([]);
    const [sliderValue, setSliderValue] = useState<number>(3);

    useEffect(() => {
        //every time the inputArray changes we make a new array called buildings made out of objects with height and sunset values.
        const buildings = inputArray.map(b => ({ height: b, sunset: 'smaller' }));
    
        //first element of the array always sees the sunset
        if(buildings.length > 0){
            buildings[0].sunset = 'sunset';
        }

        builder(buildings);
        
        setBuildingArray([...buildings]);
    }, [inputArray]);

    const floorsArray: string[] = ['bar-1', 'bar-2', 'bar-3', 'bar-4', 'bar-5', 'bar-6', 'bar-7', 'bar-8', 'bar-9', 'bar-10'];

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            numberBuildings: { value: number };
        }
        
        const numberOfBuildings = Number(target.numberBuildings.value);
        
        const arrayOfBuildings = [];

        for(let i = 1; i <= numberOfBuildings; i++){
            const number = Math.ceil(Math.random() * 10);
            arrayOfBuildings.push(number);
        }
        
        setInputArray([...arrayOfBuildings]);
    };

    const smallerBuilding = (index: number) => {
        const newBuildings = [...buildingArray];

        newBuildings[index].height = newBuildings[index].height - 1;

        builder(newBuildings);
    };

    const biggerBuilding = (index: number) => {
        const newBuildings = [...buildingArray];

        newBuildings[index].height = newBuildings[index].height + 1;

        builder(newBuildings);
    };

    const builder = (newBuildings: BuildingArray[]) => {

        const arrayBuildings = [...newBuildings];

        for(let i = 1; i < arrayBuildings.length; i++){
            //loop starts on index 1 instead of 0 because index 0 always sees the sunset.
            let taller = false;
            for(let j = 0; j < i; j++) {
                //this loop starts at index 0 to check if the builings to the west are taller or the same size
                if(arrayBuildings[j].height >= arrayBuildings[i].height){
                    taller = true;
                }
            }
            //if taller is true then the building is being blocked by a previous building, so its smaller, otherwise it sees the sunset
            taller ? arrayBuildings[i].sunset = 'smaller' : arrayBuildings[i].sunset = 'sunset';
        }

        //index 0 always sees the sunset
        if(arrayBuildings.length > 0){
            arrayBuildings[0].sunset = 'sunset';
            setBuildingArray([...arrayBuildings]);
        }
    };

    return (
        <div className="root">
            <div className='sun' data-cy='sun' data-testid='sun'></div>
            <div data-cy='scroll-container'>
                <form className="scroll-container" onSubmit={onSubmit} data-testid='submit-form'>
                    <p className='scroll-text' style={{ color: 'white' } }>Buildings: {sliderValue}</p>
                    <input className="slider" data-cy='scroll-input' data-testid='scroll-input' name='numberBuildings' type='range' min={3} max={9} value={sliderValue} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSliderValue(parseInt(e.target.value))} />
                    <button type='submit' data-testid='scroll-submit' data-cy='scroll-submit' className='submit-button'>GO!</button>
                </form>
            </div>
            <div className='city' data-cy='city'>
                {buildingArray.map((building, index) => (
                    <div key={index}>
                        <div data-testid={`building-${index}`} className={`building ${building.sunset} ${floorsArray[building.height - 1]}`}></div>
                        {building.height === 1 ? <p>{building.height} story</p> : <p>{building.height} stories</p>}
                        <div className='height-input-div'>
                            <button data-cy={`${index}-button-decrease`} className="increase-decrease-button" onClick={() => smallerBuilding(index)} disabled={building.height === 1}>-</button>
                            <button data-cy={`${index}-button-increase`} className="increase-decrease-button" onClick={() => biggerBuilding(index)} disabled={building.height === 10}>+</button>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    );
};

export default Sunset;