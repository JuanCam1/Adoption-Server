import { check } from "express-validator";

export const builderStateSchema = [
  check("state").exists().isIn(["Active", "Inactive", "All"])
]

export const createUniqueBuilderSchema = [
  check("name").exists(),
  check("stateId").exists().isFloat({
    min: 0,
    max: 3
  })
]

export const createMultipleBuilderSchema = [
  check("init").exists(),
  check("limit").exists().isFloat({
    min: 0,
    max: 100
  })
]
