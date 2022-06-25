const {
  findAllTeams,
  findTeamById,
  saveTeam,
  updateTeamQuery,
  removeTeam,
  joinTeam,
  leaveTeam,
} = require('../queries/team.queries')
const { findUserById } = require('../queries/user.queries')
const Helper = require('../Helper')
const { sendEmail } = require('../services/email')

exports.getListTeams = async (req, res) => {
  try {
    const teams = await findAllTeams()
    res.status(Helper.HTTP.OK).json(teams)
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).json(error)
  }
}
exports.getTeamById = async (req, res) => {
  try {
    const tid = parseInt(req.params.tid)
    const team = await findTeamById(tid)
    res.status(Helper.HTTP.OK).json(team)
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).json(error)
  }
}

exports.createTeam = async (req, res) => {
  const { name, levelId } = req.body
  if (Helper.isEmpty([name, levelId])) {
    res
      .status(Helper.HTTP.BAD_REQUEST)
      .json({ message: 'name,level is required' })
  }
  try {
    const adminId = req.decoded.id
    const team = await saveTeam({
      name: Helper.sqlescstr(name),
      adminId: parseInt(adminId),
      levelId: parseInt(levelId),
    })
    if (team) {
      const data = await findTeamById(team.id)
      const dataJSON = data.toJSON()
      res.status(Helper.HTTP.OK).json({
        message: 'Create team success',
        data: dataJSON,
      })
    } else {
      res
        .status(Helper.HTTP.BAD_REQUEST)
        .json({ message: 'Create team failed' })
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).json(error)
  }
}
exports.updateTeam = async (req, res) => {
  const { name, levelId } = req.body
  if (Helper.isEmpty([req.params.tid])) {
    res.status(Helper.HTTP.BAD_REQUEST).json({ message: 'tid is required' })
  }
  try {
    const tid = parseInt(req.params.tid)
    const team = await updateTeamQuery(tid, {
      name: Helper.sqlescstr(name),
      levelId: parseInt(levelId),
    })
    if (team) {
      res.status(Helper.HTTP.OK).json({
        message: 'Update team success',
        data: team,
      })
    } else {
      res
        .status(Helper.HTTP.BAD_REQUEST)
        .json({ message: 'Update team failed' })
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).json(error)
  }
}

exports.deleteTeam = async (req, res) => {
  if (Helper.isEmpty([req.params.tid])) {
    res.status(Helper.HTTP.BAD_REQUEST).json({ message: 'tid is required' })
  }
  try {
    const tid = parseInt(req.params.tid)
    const team = await removeTeam(tid)
    if (team) {
      res.status(Helper.HTTP.OK).json({
        message: 'Delete team success',
      })
    } else {
      res
        .status(Helper.HTTP.BAD_REQUEST)
        .json({ message: 'Delete team failed' })
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).json(error)
  }
}

exports.isTeamExist = async (req, res, next) => {
  try {
    const tid = req.params.tid || req.body.tid || req.query.tid
    const team = await findTeamById(tid)
    if (team) {
      next()
    } else {
      res.status(Helper.HTTP.BAD_REQUEST).json({ message: 'Team not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).json(error)
  }
}

exports.joinTeamMember = async (req, res) => {
  try {
    const tid = parseInt(req.params.tid)
    const uid = parseInt(req.decoded.id)
    const user_id = req.body.uid ? parseInt(req.body.uid) : undefined
    const teamFound = await findTeamById(tid)
    const teamFoundJSON = teamFound.toJSON()
    const teams = await findAllTeams()
    const teamsJSON = teams.map((team) => team.toJSON())

    // teamsJSON.forEach((team) => {
    //   const membres = team.membres.map((member) => member.id)
    //   if (membres.includes(uid)) {
    //     res.status(Helper.HTTP.BAD_REQUEST).json({
    //       message: 'player already in team',
    //     })
    //   }
    // })

    if (teamFoundJSON.membres.length != 10) {
      const team = await joinTeam({
        TeamId: tid,
        UserId: user_id ? user_id : uid,
      })
      const user = await findUserById(user_id ? user_id : uid)
      const data = await findTeamById(tid)
      const dataJSON = data.toJSON()
      const userJSON = user.toJSON()
      await sendEmail({
        subject: '[UltimateFive] Welcome to UltimateFive',
        text: `Hello ${userJSON.firstName},\n You have been added to team ${dataJSON.name}`,
        to: user.email,
        from: process.env.EMAIL,
      })
      res.status(Helper.HTTP.OK).json({
        message: 'Join team success',
        data: { dataJSON, userJSON },
      })
    } else {
      res.status(Helper.HTTP.BAD_REQUEST).json({ message: 'Team is full' })
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).json(error)
  }
}

exports.leaveTeamMember = async (req, res) => {
  try {
    const tid = parseInt(req.params.tid)
    const uid = parseInt(req.decoded.id)
    const team = await leaveTeam({
      TeamId: tid,
      UserId: uid,
    })
    if (team) {
      res.status(Helper.HTTP.OK).json({
        message: 'Leave team success',
        data: team,
      })
    } else {
      res.status(Helper.HTTP.BAD_REQUEST).json({ message: 'Leave team failed' })
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.SERVER_ERROR).json(error)
  }
}
