export const calculateFine = (dueDate) => {
    const fineperhour=0.1;
    const today= new Date();
    if(today > dueDate) {
        const lateHours = Math.ceil((today - dueDate) / (1000 * 60 * 60));
        const fine= lateHours * fineperhour;
        return fine;
    }
    return 0;
}