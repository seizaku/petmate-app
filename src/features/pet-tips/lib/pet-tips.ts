
import { petTips } from "~/features/pet-tips/constants/pet-tips"

export function getRandomTips() {
  return petTips[Math.floor(Math.random() * petTips.length)];
}