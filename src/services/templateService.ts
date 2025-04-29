import { CreationAttributes } from "sequelize";
import { Template } from "../models/template.model";
import { TemplateCreate, TemplateInterface } from "../types/types";



export const createTemplate = async ({ templateName, templateImage, textAreas, createdBy, isApproved } : TemplateCreate): Promise<TemplateInterface> => {
  try {
    const nameTemplateExists = await Template.findOne({
      where: {
        templateName
      }
    })
    if (nameTemplateExists) {
      const error = new Error()
      error.name = "TemplateAlreadyExists"
      throw error
    }

    const newTemplate = {
      templateName,
      templateImage,
      textAreas,
      createdBy,
      isApproved
    }

    const templateCreated = await Template.create(newTemplate as unknown as CreationAttributes<Template>)
    console.log(templateCreated);
    return templateCreated

  } catch (error) {
    (error as Error).name = (error as Error).name || 'ErrorCreatingTemplate'
    throw error
  }
}