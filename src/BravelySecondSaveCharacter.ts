class BravelySecondSaveCharacter {
    
        // Amount of JP needed to reach a given job level
        static JP_LEVELS = {
            level1: 0,
            level2: 30,
            level3: 130,
            level4: 430,
            level5: 830,
            level6: 1630,
            level7: 3130,
            level8: 5630,
            level9: 10630,
            level10: 18630,
            level11: 28629
        };
    
        // TODO: Implement, maybe
        // Not listed: level, experience, cur/max hp, cur/max mp, stats
        public primaryJob = 0;
        public secondaryJob = 0;
        public supportAbilities = {};
        public equipment = {
            rightHand: 0,
            leftHand: 0,
            head: 0,
            body: 0,
            accessory: 0,
            costume: 0,
        };
        public specialMove = {
            offensive: {
                element: 0,
                power: 0,
                enemyType: 0,
                statusEffect: 0
            },
            recovery: {
                hpRecovery: 0,
                statusCure: 0,
                mpRecovery: 0,
                bpBonus: 0
            },
            enfeebling: {
                duration: 0,
                debuff: 0,
                statusResistanceDown: 0,
                elementResistanceDown: 0
            },
            support: {
                duration: 0,
                buff: 0,
                statusResistanceUp: 0,
                elementResistanceUp: 0
            },
            triggerCondition: 0,
            catchphrases: {
                singleTarget: '',
                all: '',
                recovery: '',
                support: ''
            }
        };
        public abilink = {}; // Really not sure what format this would take. Probably a reference to data elsewhere in the save (or even another save file)
    
        public jobMastery = {
            freelancer: 0,
            knight: 0,
            blackmage: 0,
            whitemage: 0,
            monk: 0,
            ranger: 0,
            ninja: 0,
            timemage: 0,
            swordmaster: 0,
            pirate: 0,
            darkknight: 0,
            templar: 0, // could be templar, kaiser, or yokai
            summoner: 0,
            valkyrie: 0,
            redmage: 0,
            thief: 0,
            merchant: 0,
            performer: 0,
            fencer: 0,
            bishop: 0,
            wizard: 0,
            charioteer: 0,
            catmancer: 0,
            astrologian: 0,
            hawkeye: 0,
            patissier: 0,
            exorcist: 0,
            guardian: 0,
            kaiser: 0, // could be templar, kaiser, or yokai
            yokai: 0, // could be templar, kaiser, or yokai
        };
    
        public masterAllJobs = () => {
            this.setAllJobMasteries(BravelySecondSaveCharacter.JP_LEVELS.level10);
        }
    
        public legendaryAllJobs = () => {
            this.setAllJobMasteries(BravelySecondSaveCharacter.JP_LEVELS.level11);
        }
    
        private setAllJobMasteries = (jp) => {
            this.jobMastery.freelancer = jp;
            this.jobMastery.knight = jp;
            this.jobMastery.blackmage = jp;
            this.jobMastery.whitemage = jp;
            this.jobMastery.monk = jp;
            this.jobMastery.ranger = jp;
            this.jobMastery.ninja = jp;
            this.jobMastery.timemage = jp;
            this.jobMastery.swordmaster = jp;
            this.jobMastery.pirate = jp;
            this.jobMastery.darkknight = jp;
            this.jobMastery.templar = jp;
            this.jobMastery.summoner = jp;
            this.jobMastery.valkyrie = jp;
            this.jobMastery.redmage = jp;
            this.jobMastery.thief = jp;
            this.jobMastery.merchant = jp;
            this.jobMastery.performer = jp;
            this.jobMastery.fencer = jp;
            this.jobMastery.bishop = jp;
            this.jobMastery.wizard = jp;
            this.jobMastery.charioteer = jp;
            this.jobMastery.catmancer = jp;
            this.jobMastery.astrologian = jp;
            this.jobMastery.hawkeye = jp;
            this.jobMastery.patissier = jp;
            this.jobMastery.exorcist = jp;
            this.jobMastery.guardian = jp;
            this.jobMastery.kaiser = jp;
            this.jobMastery.yokai = jp;
        }
    }
    
    