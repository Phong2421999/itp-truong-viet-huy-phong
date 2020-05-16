let mongoose = require("mongoose");

class DAO {
  constructor(model) {
    this.model = model;
  }
  async getRandom(size, query) {
    try {
      let data = await mongoose
        .model(this.model)
        .aggregate(query)
        .sample(parseInt(size));
      return {
        payload: data,
        success: true,
      };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
  async getByQuery(query, selected = "") {
    try {
      let data = await mongoose.model(this.model).find(query).select(selected);
      if (data) {
        return {
          payload: data,
          success: true,
        };
      } else {
        return {
          success: false,
          payload: null,
          err: {
            message: `${this.model} data not found`,
          },
        };
      }
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
  async getAll(selected = "") {
    try {
      let data = await mongoose.model(this.model).find().select(selected);
      return {
        payload: data,
        success: true,
      };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
  async getById(id, selected = "") {
    try {
      let data = await mongoose.model(this.model).findById(id).select(selected);
      if (data)
        return {
          payload: data,
          success: true,
        };
      else
        return {
          err: {
            message: `${this.model} data not found`,
          },
          success: false,
          payload: null,
        };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
  async getSort(query, sort, { page, limit }, option) {
    try {
      let data;
      if (page && limit) {
        data = await mongoose
          .model(this.model)
          .find(query)
          .sort(sort)
          .skip(parseInt(page) * parseInt(limit))
          .limit(parseInt(limit));
      } else {
        data = await mongoose.model(this.model).find(query).sort(sort);
      }
      let { success, payload, err } = await this.count(query);
      if (success) {
        data[data.length] = {
          quantity: payload,
        };
        return {
          success: true,
          payload: data,
        };
      } else
        return {
          success: false,
          err,
        };
    } catch (error) {
      return {
        err: error,
        success: false,
      };
    }
  }
  async getPage(page, limit = 10) {
    try {
      page = parseInt(page);
      limit = parseInt(limit);
      let data = await mongoose
        .model(this.model)
        .find()
        .skip(page * limit)
        .limit(limit);
      let { success, payload, err } = await this.count();
      let quantity = 0;
      if (success) {
        quantity = payload;
        data[data.length] = { quantity };
        return { payload: data, success: true };
      } else {
        return { success: false, err };
      }
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
  async getOne(query, selected = "") {
    try {
      let data = await mongoose
        .model(this.model)
        .findOne(query)
        .select(selected);
      if (data) return { payload: data, success: true };
      else
        return {
          success: false,
          payload: null,
          err: {
            message: `${this.model} data not found`,
          },
        };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
  async count(query) {
    try {
      let data = await mongoose.model(this.model).find(query).countDocuments();
      return { payload: data, success: true };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }

  async create(createData) {
    try {
      let data = await mongoose.model(this.model).create(createData);
      data = data.toObject();
      return { payload: data, success: true };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }

  async updateById(id, updateData, option) {
    try {
      let data = await mongoose
        .model(this.model)
        .findByIdAndUpdate(id, updateData, option)
        .lean();
      return { payload: data, success: true };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }

  async updateOne(query, updateData, option) {
    try {
      let data = await mongoose
        .model(this.model)
        .findOneAndUpdate(query, updateData, option)
        .lean();
      return { payload: data, success: true };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }

  async deleteById(id) {
    try {
      let data = await mongoose.model(this.model).findByIdAndDelete(id).lean();
      return { payload: data, success: true };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }

  async deleteOne(query) {
    try {
      let data = await mongoose
        .model(this.model)
        .findOneAndDelete(query)
        .lean();
      return { payload: data, success: true };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
  async deleteMany(query) {
    try {
      let data = await mongoose.model(this.model).deleteMany(query);
      return { payload: data, success: true };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
  async aggregate(query) {
    try {
      let data = await mongoose.model(this.model).aggregate(query);
      return { payload: data, success: true };
    } catch (err) {
      return {
        err,
        success: false,
      };
    }
  }
}

module.exports = DAO;
