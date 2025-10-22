
from flask import jsonify

def register_error_handlers(app):

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify(error=str(error)), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify(error="Unauthorized"), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify(error="Forbidden"), 403

    @app.errorhandler(404)
    def not_found(error):
        return jsonify(error="Not Found"), 404

    @app.errorhandler(409)
    def conflict(error):
        return jsonify(error=str(error)), 409

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify(error="Internal Server Error"), 500
