import { PermitApplicationSchema } from "~/models/permit-application";
import StrapiAgent from "./agents/strapiAgent";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const validateData = PermitApplicationSchema.safeParse(body);
    if (!validateData.success) {
      return sendError(event,createError({
        statusCode: 400,
        statusMessage: 'Validation failed',
        data: validateData.error,
      }) 
    );
    }
    
    const agent = StrapiAgent.getInstance();
  
    try {
    const resp = await agent.create('permit-applications', validateData.data);    
    return {
      success: true,
    };
    } catch (error) {      
      return sendError(event, createError({
        statusCode: 500,
        statusMessage: 'Failed to create permit application',
        data: error,
      }));
    }

   

  });

