import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    fighterElement.append(createFighterImage(fighter));
    const textContent = document.createElement('div');
    textContent.classList.add('fighter-preview__text');
    textContent.innerHTML = `
        <ul>
            <li>NAME: ${fighter.name}</li>
            <li>HEALTH LEVEL: ${fighter.health} HP</li>
            <li>ATTACK LEVEL: ${fighter.attack} HP</li>
            <li>DEFENSE LEVEL: ${fighter.defense} HP</li>
        </ul>`;
    fighterElement.append(textContent);
    return fighterElement;
}
