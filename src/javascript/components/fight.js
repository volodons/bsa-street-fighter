import controls from '../../constants/controls';

function updateHealthBar(side, percent) {
    const healthBar = document.getElementById(`${side}-fighter-indicator`);
    let percentHit = percent;
    if (percent < 0) {
        percentHit = 0;
    }
    healthBar.style.width = `${percentHit}%`;
}

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1;
    const power = fighter.attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;
    const power = fighter.defense * dodgeChance;
    return power;
}

export function getDamage(attacker, defender) {
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    if (blockPower >= hitPower) {
        return 0;
    }
    return hitPower - blockPower;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        updateHealthBar('left', firstFighter.health);
        updateHealthBar('right', secondFighter.health);
        let isPlayerOneBlocking = false;
        let isPlayerTwoBlocking = false;

        document.addEventListener('keydown', event => {
            if (event.key === controls.PlayerOneBlock) {
                isPlayerOneBlocking = true;
            }
            if (event.key === controls.PlayerTwoBlock) {
                isPlayerTwoBlocking = true;
            }
        });

        document.addEventListener('keyup', event => {
            if (event.key === controls.PlayerOneAttack && !isPlayerTwoBlocking) {
                const damage = getDamage(firstFighter, secondFighter);
                const secondFighterHealth = secondFighter.health - damage;
                updateHealthBar('right', secondFighterHealth);
                if (secondFighterHealth <= 0) {
                    resolve(firstFighter);
                }
            }
            if (event.key === controls.PlayerTwoAttack && !isPlayerOneBlocking) {
                const damage = getDamage(secondFighter, firstFighter);
                const firstFighterHealth = firstFighter.health - damage;
                updateHealthBar('left', firstFighterHealth);
                if (firstFighterHealth <= 0) {
                    resolve(secondFighter);
                }
            }

            if (event.key === controls.PlayerOneBlock) {
                isPlayerOneBlocking = false;
            }
            if (event.key === controls.PlayerTwoBlock) {
                isPlayerTwoBlocking = false;
            }
        });
    });
}
