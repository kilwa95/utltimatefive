const {saveMatch,findAllMatches,findMatchById,findMatchByLevelId,updateMatch,deleteMatch} = require('../queries/match.queries');
const Helper = require('../Helper');


exports.getListMatchs = async (req,res) => {
    try {
        const matches = await findAllMatches();
        res.status(Helper.HTTP.OK).json({
            data: matches
        });
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json({
            message: error.message
        });
    }
}

exports.getMatchById = async (req,res) => {
    if(Helper.isEmpty([req.params.mid])) {
        res.status(Helper.HTTP.BAD_REQUEST).send('mid is required');
    }
    try {
        const mid = parseInt(req.params.mid);
        const match = await findMatchById(mid);
        res.status(Helper.HTTP.OK).json({
            data: match
        });
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json({
            message: error.message
        });
    }
}

exports.createMatch = async (req,res) => {
    const {name,levelId} = req.body;
    console.log(req.body);

    if(Helper.isEmpty([name,levelId])) {
        res.status(Helper.HTTP.BAD_REQUEST).send('name,levelId is required');
    }
    try {
        const organizerId = parseInt(req.decoded.id);
        const match = await saveMatch({
            name:Helper.sqlescstr(name),
            levelId:parseInt(levelId),
            organizerId:parseInt(organizerId)
        });
        if(match) {
            res.status(Helper.HTTP.CREATED).json({
                message: 'Match created',
                data: match,
            });
        }
        else {
            res.status(Helper.HTTP.BAD_REQUEST).json({
                message: 'Match not created',
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

exports.updateMatch = async (req,res) => {
    const {name,levelId} = req.body;
    if(Helper.isEmpty([req.params.mid])) {
        res.status(Helper.HTTP.BAD_REQUEST).send('matchId is required');
    }
    try {
        const mid = parseInt(req.params.mid);
        const match = await updateMatch(parseInt(mid),{
            name:Helper.sqlescstr(name),
            levelId: parseInt(levelId),
        });
        if(match) {
            res.status(Helper.HTTP.OK).json({
                message: 'Match updated',
                data: match,
            });
        }
        else {
            res.status(Helper.HTTP.BAD_REQUEST).json({
                message: 'Match not updated',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

exports.deleteMatch = async (req,res) => {
    if(Helper.isEmpty([req.params.mid])) {
        res.status(Helper.HTTP.BAD_REQUEST).send('matchId is required');
    }
    try {
        const mid = parseInt(req.params.mid);
        await deleteMatch(mid);
        res.status(Helper.HTTP.OK).json({
            message: 'Match deleted',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

exports.getMatchByLevelId = async (req,res) => {
    if(Helper.isEmpty([req.params.lid])) {
        res.status(Helper.HTTP.BAD_REQUEST).send('lid is required');
    }
    try {
        const lid = parseInt(req.params.lid);
        const match = await findMatchByLevelId(lid);
        res.status(Helper.HTTP.OK).json({
            data: match
        });
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json({
            message: error.message
        });
    }
}

exports.isMatchExist = async (req,res,next) => {
    try {
        const mid = req.params.mid || req.body.mid || req.query.mid;
        if(Helper.isEmpty([mid])) {
            res.status(Helper.HTTP.BAD_REQUEST).send('mid is required');
        }
        const match = await findMatchById(mid);
        if(match) {
            return next();
        }
        else {
            res.status(Helper.HTTP.NOT_FOUND).json({
                message: 'Match not found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

