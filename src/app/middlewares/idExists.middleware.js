
export default function idExists(controller) {

    return async function (req, res, next) {

        const id = req.params.id
    
        const element = await controller.getById(id)
    
        if (element.length == 0) {          
            return res
                .status(404).json({ message: "ID not found." })
        }
        console.log('ID exist.')
        return next()
    }
    
}



