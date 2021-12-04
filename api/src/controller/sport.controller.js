const {findAllSports,findSportById,saveSport,updateSportQuery,removeSport} = require('../queries/sport.queries');
const Helper = require('../Helper');


exports.getListSports = async (req, res) => {
    try {
        const sports = await findAllSports();
        res.status(Helper.HTTP.OK).json({
            data: sports
        });
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json({
            error: error.message
        });
    }
}

exports.getSportById = async (req, res) => {
    try {
        const sid = parseInt(req.params.sid);
        const sport = await findSportById(sid);
        res.status(Helper.HTTP.OK).json({
            data: sport
        });
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json({
            error: error.message
        });
    }
}

exports.createSport = async (req, res) => {
    if(Helper.isEmpty([req.body.name])){
        res.status(Helper.HTTP.BAD_REQUEST).json({
            error: "Name is required"
        });
    }
    try {
        const sport = await saveSport({
            name: Helper.sqlescstr(req.body.name)
        });
        if(sport){
            res.status(Helper.HTTP.OK).json({
                message: "Sport created successfully",
                data: sport
            });
        }else{
            res.status(Helper.HTTP.BAD_REQUEST).json({
                error: "Sport not created"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json({
            error: error.message
        });
    }
}

exports.updateSport = async (req, res) => {
    try {
        const sid = parseInt(req.params.sid);
        const sport = await updateSportQuery(sid,{
            name: Helper.sqlescstr(req.body.name)
        });
        if(sport){
            res.status(Helper.HTTP.OK).json({
                message: "Sport updated successfully",
                data: sport
            });
        }else{
            res.status(Helper.HTTP.BAD_REQUEST).json({
                error: "Sport not updated"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json({
            error: error.message
        });
    }
}

exports.deleteSport = async (req, res) => {
    try {
        const sid = parseInt(req.params.sid);
        const sport = await removeSport(sid);
        if(sport){
            res.status(Helper.HTTP.OK).json({
                message: "Sport deleted successfully",
                data: sport
            });
        }else{
            res.status(Helper.HTTP.BAD_REQUEST).json({
                error: "Sport not deleted"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json({
            error: error.message
        });
    }
}
