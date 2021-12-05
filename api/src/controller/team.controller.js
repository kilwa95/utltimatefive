const {findAllTeams,findTeamById,saveTeam,updateTeamQuery,removeTeam,joinTeam} = require('../queries/team.queries');
const Helper = require('../Helper');


exports.getListTeams = async (req,res) => {
    try {
        const teams = await findAllTeams();
        res.status(Helper.HTTP.OK).json(teams);
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json(error);
    }
}
exports.getTeamById = async (req, res) => {
    try {
        const tid = parseInt(req.params.tid);
        const team = await findTeamById(tid);
        res.status(Helper.HTTP.OK).json(team);
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json(error);
    }
}

exports.createTeam = async (req, res) => {
    const {name,levelId} = req.body;
    if(Helper.isEmpty([name,levelId])) {
        res.status(Helper.HTTP.BAD_REQUEST).json({message: 'name,level is required'});
    }
    try {
        const captineId = req.decoded.id;
        const team = await saveTeam({
            name: Helper.sqlescstr(name),
            captineId: parseInt(captineId),
            levelId: parseInt(levelId)
        });
        if(team) {
            res.status(Helper.HTTP.OK).json({
                message: 'Create team success',
                data: team
            });
        } else {
            res.status(Helper.HTTP.BAD_REQUEST).json({message: 'Create team failed'});
        }
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json(error);
    }
}
exports.updateTeam = async (req, res) => {
    const {name,levelId} = req.body;
    if(Helper.isEmpty([req.params.tid])) {
        res.status(Helper.HTTP.BAD_REQUEST).json({message: 'tid is required'});
    }
    try {
        const tid = parseInt(req.params.tid);
        const team = await updateTeamQuery(tid,{
            name: Helper.sqlescstr(name),
            levelId: parseInt(levelId)
        });
        if(team) {
            res.status(Helper.HTTP.OK).json({
                message: 'Update team success',
                data: team
            });
        }
        else {
            res.status(Helper.HTTP.BAD_REQUEST).json({message: 'Update team failed'});
        }
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json(error);
    }
}

exports.deleteTeam = async (req, res) => {
    if(Helper.isEmpty([req.params.tid])) {
        res.status(Helper.HTTP.BAD_REQUEST).json({message: 'tid is required'});
    }
    try {
        const tid = parseInt(req.params.tid);
        const team = await removeTeam(tid);
        if(team) {
            res.status(Helper.HTTP.OK).json({
                message: 'Delete team success',
            });
        }
        else {
            res.status(Helper.HTTP.BAD_REQUEST).json({message: 'Delete team failed'});
        }
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json(error);
    }
}

exports.isTeamExist = async (req, res, next) => {
    try {
        const tid = req.params.tid || req.body.tid || req.query.tid;
        const team = await findTeamById(tid);
        if(team) {
            next();
        } else {
            res.status(Helper.HTTP.BAD_REQUEST).json({message: 'Team not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json(error);
    }
}

exports.joinTeamMember = async (req, res) => {
    try {
        const tid = parseInt(req.params.tid);
        const uid = parseInt(req.decoded.id);
        const team = await joinTeam({
            TeamId: tid,
            UserId: uid
        });
        if(team) {
            res.status(Helper.HTTP.OK).json({
                message: 'Join team success',
                data: team
            });
        }
        else {
            res.status(Helper.HTTP.BAD_REQUEST).json({message: 'Join team failed'});
        }
    } catch (error) {
        console.error(error);
        res.status(Helper.HTTP.SERVER_ERROR).json(error);
    }
}