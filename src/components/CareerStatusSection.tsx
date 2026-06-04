import { type CareerState } from '../game/careerState';
import { CareerStatusPanel } from './CareerStatusPanel';

type CareerStatusSectionProps = {
  careerState?: CareerState;
};

export function CareerStatusSection({ careerState }: CareerStatusSectionProps) {
  return <CareerStatusPanel careerState={careerState} />;
}
