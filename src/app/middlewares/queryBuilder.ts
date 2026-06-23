import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

// Local alias for FilterQuery to avoid mismatched mongoose type exports across versions
type FilterQuery<T> = Record<string, any>;


export const queryBuilder = <T>(model: Model<T>, searchableFields: string[]) => {
      return async (req: Request, res: Response, next: NextFunction) => {
            try {
                  const queryParams = { ...req.query };
                  const mongoQuery: FilterQuery<T> = {};

                  // Searching
                  const searchTerm = queryParams.searchTerm as string;
                  if (searchTerm) {
                        mongoQuery.$or = searchableFields.map((field) => ({
                              [field]: { $regex: searchTerm, $options: "i" }
                        } as FilterQuery<T>)
                        );
                  };

                  const excludeFields = ["searchTerm", "sort", "limit", "page"];

                  // Filtering
                  const filter = excludeFields.forEach(field => delete queryParams[field]);
                  for (const key in queryParams) {
                        const value = queryParams[key];

                        if (typeof value === "string") {
                              (mongoQuery as any)[key] = { $regex: value, $options: "i" };
                        };
                  };

                  // Sorting
                  const sortBy = (req.query.sort as string)?.split(",")?.join("") || "-createdAt";

                  // Pagination
                  const page = Number(req.query.page) || 1;
                  const limit = Number(req.query.limit) || 10;
                  const skip = (page - 1) * limit;

                  // Final data
                  const total = await model.countDocuments(mongoQuery);
                  const totalPage = Math.ceil(total / limit);
                  const result = await model.find(mongoQuery)
                        .sort(sortBy)
                        .skip(skip)
                        .limit(limit);

                  const meta = { page, limit, total, totalPage };
                  res.locals.data = { meta, result };

                  next();
            } catch (error) {
                  console.log("query-builder error: ", error);
                  next(error);
            }
      };
};