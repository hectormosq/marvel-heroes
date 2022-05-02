export enum HeroProp {
  CITIZENSHIP = 'citizenshipLabel',
  CREATOR = 'creatorLabel',
  GENDER = 'genderLabel',
  MEMBEROF = 'memberOfLabel',
  NAME = 'nameLabel',
  OCCUPATION = 'occupationLabel',
  SKILLS = 'skillsLabel',
}

export enum HeroChart {
  CITIZENSHIP = 'citizenshipChart',
  CREATOR = 'creatorChart',
  GENDER = 'genderChart',
  MEMBEROF = 'memberOfChart',
  NAME = 'nameChart',
  OCCUPATION = 'occupationChart',
  SKILLS = 'skillsChart',
}

export interface MarvelHero {
  [HeroProp.CITIZENSHIP]: string;
  [HeroProp.CREATOR]: string;
  [HeroProp.GENDER]: string;
  [HeroProp.MEMBEROF]: string;
  [HeroProp.NAME]: string;
  [HeroProp.OCCUPATION]: string;
  [HeroProp.SKILLS]: string;
}

export interface HeroFilter {
  name: string;
}

export const HeroPropChartMap = {
  [HeroProp.CITIZENSHIP]: HeroChart.CITIZENSHIP,
  [HeroProp.CREATOR]: HeroChart.CREATOR,
  [HeroProp.GENDER]: HeroChart.GENDER,
  [HeroProp.MEMBEROF]: HeroChart.MEMBEROF,
  [HeroProp.NAME]: HeroChart.NAME,
  [HeroProp.OCCUPATION]: HeroChart.OCCUPATION,
  [HeroProp.SKILLS]: HeroChart.SKILLS,
};
